const prisma = require('../../config/db');
const { logAction } = require('../../services/auditService');
const supabase = require('../../config/supabase');
const fs = require('fs');
const path = require('path');

const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded or invalid format.' });
    }

    let fileUrl = `/uploads/${req.file.filename}`;
    const altText = req.body.altText || req.file.originalname;

    // If Supabase Storage is configured, upload to Supabase bucket
    if (supabase) {
      try {
        const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'kkkmedia';
        const fileContent = fs.readFileSync(req.file.path);
        const storagePath = `articles/${Date.now()}-${req.file.filename}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(storagePath, fileContent, {
            contentType: req.file.mimetype,
            upsert: true,
          });

        if (!uploadError && uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(storagePath);

          if (publicUrlData && publicUrlData.publicUrl) {
            fileUrl = publicUrlData.publicUrl;
            console.log(`[Supabase Storage] Image uploaded to cloud: ${fileUrl}`);
          }
        } else {
          console.warn('[Supabase Storage] Cloud upload failed, falling back to local file:', uploadError?.message);
        }
      } catch (storageErr) {
        console.warn('[Supabase Storage] Error during cloud upload:', storageErr.message);
      }
    }

    const mediaAsset = await prisma.mediaAsset.create({
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: fileUrl,
        altText,
        uploaderId: req.user?.id || null,
      },
    });

    if (req.user) {
      await logAction(req.user.id, 'CREATE', 'MediaAsset', mediaAsset.id, `Uploaded image: ${req.file.originalname}`, req);
    }

    return res.status(201).json({
      success: true,
      message: 'Image uploaded successfully.',
      data: {
        id: mediaAsset.id,
        url: fileUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        altText,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getMediaList = async (req, res, next) => {
  try {
    const { page = 1, limit = 24 } = req.query;
    const take = Math.max(1, parseInt(limit, 10));
    const skip = (Math.max(1, parseInt(page, 10)) - 1) * take;

    const [media, total] = await Promise.all([
      prisma.mediaAsset.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.mediaAsset.count(),
    ]);

    res.json({
      success: true,
      data: {
        media,
        total,
        page: parseInt(page, 10),
        totalPages: Math.ceil(total / take) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteMedia = async (req, res, next) => {
  try {
    const { id } = req.params;
    const asset = await prisma.mediaAsset.findUnique({ where: { id: Number(id) } });

    if (!asset) {
      return res.status(404).json({ success: false, message: 'Media asset not found.' });
    }

    // Attempt to remove physical file
    const filePath = path.join(__dirname, '..', '..', '..', 'public', asset.url);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error('[Media] Failed to delete file on disk:', err.message);
      }
    }

    await prisma.mediaAsset.delete({ where: { id: Number(id) } });
    await logAction(req.user.id, 'DELETE', 'MediaAsset', id, `Deleted media: ${asset.originalName}`, req);

    res.json({ success: true, message: 'Media asset deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadImage,
  getMediaList,
  deleteMedia,
};
