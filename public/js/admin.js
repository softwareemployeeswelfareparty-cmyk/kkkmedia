/**
 * KKK Media — Admin Portal Client Script
 */

// Toast notification helper
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  const borderCol = type === 'success' ? '#10b981' : (type === 'error' ? '#ef4444' : '#3b82f6');
  toast.style.borderLeftColor = borderCol;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : (type === 'error' ? '✕' : 'ℹ')}</span>
    <div>${message}</div>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Confirmation Modal helper
function showConfirmModal({ title, message, confirmText = 'உறுதி செய் (Confirm)', onConfirm }) {
  let modalBackdrop = document.getElementById('globalConfirmModal');
  if (!modalBackdrop) {
    modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'globalConfirmModal';
    modalBackdrop.className = 'modal-backdrop';
    modalBackdrop.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 id="confirmModalTitle" style="font-size:1.15rem; font-weight:700;"></h3>
          <button type="button" class="btn btn-secondary btn-sm" id="confirmModalClose">✕</button>
        </div>
        <div class="modal-body" id="confirmModalMessage" style="color:#4b5563;"></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="confirmModalCancel">ரத்து (Cancel)</button>
          <button type="button" class="btn btn-danger" id="confirmModalSubmit"></button>
        </div>
      </div>
    `;
    document.body.appendChild(modalBackdrop);
  }

  const titleEl = document.getElementById('confirmModalTitle');
  const msgEl = document.getElementById('confirmModalMessage');
  const submitBtn = document.getElementById('confirmModalSubmit');
  const cancelBtn = document.getElementById('confirmModalCancel');
  const closeBtn = document.getElementById('confirmModalClose');

  titleEl.textContent = title;
  msgEl.textContent = message;
  submitBtn.textContent = confirmText;

  modalBackdrop.classList.add('active');

  const cleanup = () => {
    modalBackdrop.classList.remove('active');
    submitBtn.onclick = null;
    cancelBtn.onclick = null;
    closeBtn.onclick = null;
  };

  submitBtn.onclick = () => {
    cleanup();
    if (onConfirm) onConfirm();
  };
  cancelBtn.onclick = cleanup;
  closeBtn.onclick = cleanup;
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Sidebar Toggle
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const adminSidebar = document.getElementById('adminSidebar');
  if (sidebarToggleBtn && adminSidebar) {
    sidebarToggleBtn.addEventListener('click', () => {
      adminSidebar.classList.toggle('open');
    });
  }

  // 2. Article Form Logic (Slug Generator, SEO counters, Tags, Image Upload)
  const articleForm = document.getElementById('articleForm');
  if (articleForm) {
    const titleInput = document.getElementById('articleTitle');
    const slugInput = document.getElementById('articleSlug');
    const seoTitleInput = document.getElementById('seoTitle');
    const seoDescInput = document.getElementById('seoDescription');
    const seoTitleCount = document.getElementById('seoTitleCount');
    const seoDescCount = document.getElementById('seoDescCount');
    const imageFileInput = document.getElementById('imageFileInput');
    const featuredImageInput = document.getElementById('featuredImage');
    const imagePreviewBox = document.getElementById('imagePreviewBox');
    const imagePreviewImg = document.getElementById('imagePreviewImg');
    const dropzone = document.getElementById('imageDropzone');
    const statusSelect = document.getElementById('articleStatus');
    const scheduleBox = document.getElementById('scheduleBox');
    const tagsContainer = document.getElementById('tagsContainer');
    const tagTextInput = document.getElementById('tagTextInput');
    const tagsHiddenInput = document.getElementById('tagsHidden');

    // Auto slug from English/Tamil title if slug is empty or user is typing new article
    if (titleInput && slugInput) {
      titleInput.addEventListener('blur', () => {
        if (!slugInput.value.trim()) {
          const val = titleInput.value.trim();
          const cleanSlug = val
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
          slugInput.value = cleanSlug || `news-${Date.now()}`;
        }
      });
    }

    // SEO length counters
    if (seoTitleInput && seoTitleCount) {
      seoTitleInput.addEventListener('input', () => {
        seoTitleCount.textContent = `${seoTitleInput.value.length}/60 எழுத்துகள்`;
      });
    }
    if (seoDescInput && seoDescCount) {
      seoDescInput.addEventListener('input', () => {
        seoDescCount.textContent = `${seoDescInput.value.length}/160 எழுத்துகள்`;
      });
    }

    // Scheduled status toggle
    if (statusSelect && scheduleBox) {
      const toggleSchedule = () => {
        if (statusSelect.value === 'SCHEDULED') {
          scheduleBox.style.display = 'block';
        } else {
          scheduleBox.style.display = 'none';
        }
      };
      statusSelect.addEventListener('change', toggleSchedule);
      toggleSchedule();
    }

    // Image Upload Handler
    const handleUpload = async (file) => {
      if (!file) return;
      const formData = new FormData();
      formData.append('image', file);
      const altText = document.getElementById('imageAlt')?.value || '';
      formData.append('altText', altText);

      try {
        showToast('படம் பதிவேற்றப்படுகிறது... (Uploading image)', 'info');
        const res = await fetch('/api/media/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          featuredImageInput.value = data.data.url;
          imagePreviewImg.src = data.data.url;
          imagePreviewBox.style.display = 'block';
          showToast('படம் வெற்றிகரமாக பதிவேற்றப்பட்டது! (Image uploaded)');
        } else {
          showToast(data.message || 'Image upload failed', 'error');
        }
      } catch (err) {
        showToast('Error uploading image', 'error');
      }
    };

    if (imageFileInput) {
      imageFileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          handleUpload(e.target.files[0]);
        }
      });
    }

    if (dropzone) {
      dropzone.addEventListener('click', () => imageFileInput.click());
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'var(--admin-primary)';
      });
      dropzone.addEventListener('dragleave', () => {
        dropzone.style.borderColor = 'var(--admin-border)';
      });
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'var(--admin-border)';
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleUpload(e.dataTransfer.files[0]);
        }
      });
    }

    // Tag Chips Builder
    let currentTags = [];
    if (tagsHiddenInput && tagsHiddenInput.value) {
      currentTags = tagsHiddenInput.value.split(',').map((t) => t.trim()).filter(Boolean);
    }

    const renderTags = () => {
      if (!tagsContainer) return;
      // Keep input, remove chips
      const chips = tagsContainer.querySelectorAll('.tag-chip');
      chips.forEach((c) => c.remove());

      currentTags.forEach((tag, idx) => {
        const chip = document.createElement('span');
        chip.className = 'badge tag-chip';
        chip.style.backgroundColor = '#e5e7eb';
        chip.style.color = '#374151';
        chip.style.padding = '0.3rem 0.6rem';
        chip.style.gap = '0.3rem';
        chip.innerHTML = `${tag} <span style="cursor:pointer;font-weight:bold;">&times;</span>`;
        chip.querySelector('span').addEventListener('click', () => {
          currentTags.splice(idx, 1);
          renderTags();
        });
        tagsContainer.insertBefore(chip, tagTextInput);
      });

      if (tagsHiddenInput) {
        tagsHiddenInput.value = currentTags.join(',');
      }
    };

    if (tagTextInput) {
      tagTextInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
          e.preventDefault();
          const val = tagTextInput.value.trim().replace(',', '');
          if (val && !currentTags.includes(val)) {
            currentTags.push(val);
            tagTextInput.value = '';
            renderTags();
          }
        }
      });
      renderTags();
    }

    // Article Form Submit (AJAX)
    articleForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = articleForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'சேமிக்கப்படுகிறது... (Saving...)';

      const isEdit = articleForm.getAttribute('data-is-edit') === 'true';
      const articleId = articleForm.getAttribute('data-article-id');
      const url = isEdit ? `/api/articles/${articleId}` : '/api/articles';
      const method = isEdit ? 'PUT' : 'POST';

      const payload = {
        title: document.getElementById('articleTitle').value.trim(),
        slug: document.getElementById('articleSlug').value.trim(),
        categoryId: document.getElementById('articleCategory').value,
        shortDescription: document.getElementById('shortDescription').value.trim(),
        fullContent: document.getElementById('fullContent').value.trim(),
        featuredImage: document.getElementById('featuredImage').value.trim(),
        imageAlt: document.getElementById('imageAlt').value.trim(),
        status: document.getElementById('articleStatus').value,
        scheduledDate: document.getElementById('scheduledDate')?.value || null,
        isFeatured: document.getElementById('isFeatured')?.checked || false,
        isBreaking: document.getElementById('isBreaking')?.checked || false,
        seoTitle: document.getElementById('seoTitle')?.value.trim() || null,
        seoDescription: document.getElementById('seoDescription')?.value.trim() || null,
        seoKeywords: document.getElementById('seoKeywords')?.value.trim() || null,
        canonicalUrl: document.getElementById('canonicalUrl')?.value.trim() || null,
        tags: tagsHiddenInput?.value || '',
      };

      try {
        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showToast(isEdit ? 'செய்தி வெற்றிகரமாக புதுப்பிக்கப்பட்டது!' : 'செய்தி உருவாக்கப்பட்டது!');
          setTimeout(() => {
            window.location.href = '/admin/articles';
          }, 800);
        } else {
          showToast(data.message || 'Operation failed', 'error');
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      } catch (err) {
        showToast('Server communication error', 'error');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  // 3. Articles List Actions (Delete, Toggle Featured, Toggle Breaking)
  document.querySelectorAll('.btn-delete-article').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const title = btn.getAttribute('data-title');
      showConfirmModal({
        title: 'செய்தியை நீக்க வேண்டுமா?',
        message: `"${title}" என்ற செய்தியை நிச்சயமாக நீக்க விரும்புகிறீர்களா? இந்த செயலை மீண்டும் மாற்ற முடியாது.`,
        confirmText: 'ஆம், நீக்கு (Delete)',
        onConfirm: async () => {
          try {
            const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
              showToast('செய்தி நீக்கப்பட்டது.');
              const row = document.getElementById(`article-row-${id}`);
              if (row) row.remove();
            } else {
              showToast(data.message || 'Failed to delete', 'error');
            }
          } catch (err) {
            showToast('Error communicating with server', 'error');
          }
        },
      });
    });
  });

  document.querySelectorAll('.btn-toggle-featured').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      try {
        const res = await fetch(`/api/articles/${id}/toggle-featured`, { method: 'PATCH' });
        const data = await res.json();
        if (data.success) {
          showToast(data.message);
          btn.classList.toggle('active', data.isFeatured);
          btn.innerHTML = data.isFeatured ? '★ Featured' : '☆ Feature';
        }
      } catch (err) {
        showToast('Error updating status', 'error');
      }
    });
  });

  document.querySelectorAll('.btn-toggle-breaking').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      try {
        const res = await fetch(`/api/articles/${id}/toggle-breaking`, { method: 'PATCH' });
        const data = await res.json();
        if (data.success) {
          showToast(data.message);
          btn.classList.toggle('active', data.isBreaking);
          btn.innerHTML = data.isBreaking ? '🔥 Breaking' : 'Breaking News';
        }
      } catch (err) {
        showToast('Error updating status', 'error');
      }
    });
  });

  // 4. Categories Management (Create, Edit, Delete)
  const categoryForm = document.getElementById('categoryForm');
  if (categoryForm) {
    categoryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const isEdit = categoryForm.getAttribute('data-is-edit') === 'true';
      const id = categoryForm.getAttribute('data-category-id');
      const url = isEdit ? `/api/categories/${id}` : '/api/categories';
      const method = isEdit ? 'PUT' : 'POST';

      const payload = {
        nameTamil: document.getElementById('categoryNameTamil').value.trim(),
        nameEnglish: document.getElementById('categoryNameEnglish').value.trim(),
        slug: document.getElementById('categorySlug').value.trim(),
        description: document.getElementById('categoryDesc').value.trim(),
        displayOrder: document.getElementById('categoryOrder').value,
      };

      try {
        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showToast(isEdit ? 'பிரிவு புதுப்பிக்கப்பட்டது!' : 'புதிய பிரிவு சேர்க்கப்பட்டது!');
          setTimeout(() => window.location.reload(), 600);
        } else {
          showToast(data.message || 'Operation failed', 'error');
        }
      } catch (err) {
        showToast('Server error', 'error');
      }
    });
  }

  document.querySelectorAll('.btn-delete-category').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      showConfirmModal({
        title: 'பிரிவை நீக்க வேண்டுமா?',
        message: `"${name}" என்ற பிரிவை நீக்க விரும்புகிறீர்களா? தொடர்புடைய செய்திகள் இருந்தால் நீக்க முடியாது.`,
        confirmText: 'ஆம், நீக்கு',
        onConfirm: async () => {
          try {
            const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
              showToast('பிரிவு நீக்கப்பட்டது.');
              setTimeout(() => window.location.reload(), 600);
            } else {
              showToast(data.message || 'Cannot delete category', 'error');
            }
          } catch (err) {
            showToast('Server error', 'error');
          }
        },
      });
    });
  });

  // 5. Site Settings Form Submit
  const settingsForm = document.getElementById('settingsForm');
  if (settingsForm) {
    settingsForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = settingsForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;

      const formData = new FormData(settingsForm);
      const payload = {};
      formData.forEach((val, key) => {
        payload[key] = val;
      });

      // Handle checkboxes
      payload.adsense_enabled = document.getElementById('adsense_enabled')?.checked ? 'true' : 'false';
      payload.breaking_news_enabled = document.getElementById('breaking_news_enabled')?.checked ? 'true' : 'false';

      try {
        const res = await fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showToast('தள அமைப்புகள் வெற்றிகரமாக சேமிக்கப்பட்டன! (Settings updated)');
        } else {
          showToast(data.message || 'Error saving settings', 'error');
        }
      } catch (err) {
        showToast('Server error', 'error');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  // 6. Admin Profile Form Submit
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        name: document.getElementById('profileName').value.trim(),
        bio: document.getElementById('profileBio').value.trim(),
        currentPassword: document.getElementById('currentPassword').value,
        newPassword: document.getElementById('newPassword').value,
      };

      try {
        const res = await fetch('/api/auth/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showToast('சுயவிவரம் புதுப்பிக்கப்பட்டது! (Profile updated)');
          document.getElementById('currentPassword').value = '';
          document.getElementById('newPassword').value = '';
        } else {
          showToast(data.message || 'Update failed', 'error');
        }
      } catch (err) {
        showToast('Server error', 'error');
      }
    });
  }
});
