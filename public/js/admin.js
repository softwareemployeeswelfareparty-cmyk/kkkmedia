/**
 * KKK Media — Admin Portal Client Script & Bilingual Engine (Tamil & English)
 */

// Admin Portal Translation Dictionary (Tamil & English)
const ADMIN_TRANSLATIONS = {
  ta: {
    // Navigation & Common
    nav_main: 'முக்கிய பிரிவு (Main)',
    nav_dashboard: 'கட்டுப்பாட்டு அறை (Dashboard)',
    nav_content: 'செய்திகள் மேலாண்மை (Content)',
    nav_all_articles: 'அனைத்து செய்திகள் (Articles)',
    nav_new_article: 'புதிய செய்தி (New Article)',
    nav_categories: 'பிரிவுகள் (Categories)',
    nav_media: 'மீடியா நூலகம் (Media Assets)',
    nav_pages: 'முக்கிய பக்கங்கள் (Pages)',
    nav_config: 'அமைப்புகள் (Configuration)',
    nav_redirects: 'மறுதிசைவுகள் (URL Redirects)',
    nav_errors: 'பிழைகள் கண்காணிப்பு (Error Monitor)',
    nav_settings: 'தள அமைப்புகள் (Settings)',
    nav_profile: 'சுயவிவரம் (My Profile)',
    nav_visit_site: 'வலைத்தளத்தைப் பார்க்க (Visit Site)',
    topbar_title: 'KKK Media செய்தி நிர்வாக தளம்',
    topbar_view_site: 'தளத்தைப் பார்',
    topbar_new_article: '+ புதிய செய்தி',
    lang_menu_title: 'நிர்வாக மொழி / Admin Language',
    btn_logout: 'வெளியேறு (Logout)',
    theme_toggle: 'கருப்பு / வெளிர் நிற மாற்றம்',

    // Login View
    login_portal_desc: 'செய்தி ஆசிரியர் நிர்வாக தளம் (Editorial Portal)',
    login_email_label: 'மின்னஞ்சல் (Email Address)',
    login_password_label: 'கடவுச்சொல் (Password)',
    login_btn: 'உள்நுழைக (Sign In)',
    login_default_creds: 'இயல்புநிலை நிர்வாகி:',
    login_back_home: '← பொது வலைத்தளத்திற்குச் செல்',

    // Dashboard View
    dash_title: 'கட்டுப்பாட்டு அறை (Dashboard Overview)',
    dash_subtitle_prefix: 'வணக்கம்',
    dash_subtitle_suffix: '! KKK Media செய்தி தளம் சீராக இயங்கி வருகிறது.',
    dash_btn_new: 'புதிய செய்தி எழுதுக',
    dash_stat_total: 'மொத்த செய்திகள்',
    dash_stat_published: 'வெளியானவை (Published)',
    dash_stat_drafts: 'வரைவு (Drafts)',
    dash_stat_scheduled: 'திட்டமிடப்பட்டவை (Scheduled)',
    dash_stat_categories: 'பிரிவுகள் (Categories)',
    dash_stat_views: 'மொத்த பார்வைகள் (Views)',
    dash_recent_articles: 'சமீபத்திய செய்திகள் (Recent Articles)',
    dash_view_all: 'அனைத்தும் →',
    dash_recent_activity: 'சமீபத்திய செயல்பாடுகள் (Recent Logs)',

    // Table Headers & Actions
    th_image: 'படம்',
    th_title: 'தலைப்பு',
    th_category: 'பிரிவு',
    th_author: 'ஆசிரியர்',
    th_status: 'நிலை',
    th_highlights: 'சிறப்புகள்',
    th_views: 'பார்வைகள்',
    th_date: 'தேதி',
    th_order: 'வரிசை',
    th_slug: 'URL முகவரி',
    th_article_count: 'செய்திகள்',
    th_actions: 'செயல்கள்',
    btn_edit: 'திருத்து',
    btn_delete: 'நீக்கு',
    btn_view: 'பார்',
    status_published: 'வெளியானது',
    status_draft: 'வரைவு',
    status_scheduled: 'திட்டமிடப்பட்டது',

    // Articles List Page
    art_list_title: 'செய்திகள் மேலாண்மை (Articles)',
    art_list_subtitle_prefix: 'மொத்தம்',
    art_list_subtitle_suffix: 'செய்திகள் பதிவு செய்யப்பட்டுள்ளன.',
    art_filter_search_ph: 'தலைப்பு அல்லது செய்தி தேடுக...',
    art_filter_all_cats: 'அனைத்து பிரிவுகள் (All Categories)',
    art_filter_all_status: 'அனைத்து நிலைகள் (All Status)',
    art_btn_filter: 'வடிகட்டு (Filter)',
    art_btn_clear_filter: 'வடிகட்டலை நீக்கு',
    art_badge_breaking: 'முக்கிய செய்தி',
    art_badge_featured: 'தலைப்புச் செய்தி',
    art_empty: 'செய்திகள் எதுவும் காணப்படவில்லை.',

    // Article Form Page
    art_form_create_title: 'புதிய செய்தி உருவாக்குதல் (Create Article)',
    art_form_edit_title: 'செய்தி திருத்துதல் (Edit Article)',
    art_form_create_subtitle: 'KKK Media தளத்தில் புதிய செய்தியை வெளியிடவும் அல்லது வரைவாக சேமிக்கவும்.',
    art_form_back_list: '← செய்திகள் பட்டியலுக்குச் செல்',
    art_label_headline: 'செய்தி தலைப்பு (Headline)',
    art_ph_headline: 'வாசகர்களை ஈர்க்கும் தலைப்பை உள்ளிடவும்...',
    art_label_slug: 'வலைத்தள முகவரி (URL Slug)',
    art_help_slug: 'தலைப்பை உள்ளிட்டு வெளியே கிளிக் செய்தால் தானாகவே நிரப்பப்படும்.',
    art_label_excerpt: 'சுருக்க உரை (Short Description / Excerpt)',
    art_ph_excerpt: 'செய்தியின் முக்கிய 2-3 வரிகள் சுருக்கம்...',
    art_help_excerpt: 'முகப்பு அட்டை மற்றும் சமூக வலைதளப் பகிர்வுகளில் இது தோன்றும்.',
    art_label_content: 'முழு செய்தி விவரம் (Full Content - HTML & Text)',
    art_label_seo_title: 'SEO தேடுபொறி தலைப்பு (Meta Title)',
    art_label_seo_desc: 'SEO தேடுபொறி விவரிப்பு (Meta Description)',
    art_label_publish_settings: 'வெளியீட்டு அமைப்புகள் (Publishing)',
    art_label_status: 'செய்தி நிலை (Status)',
    art_label_schedule_time: 'வெளியீட்டு தேதி & நேரம் (Schedule Time)',
    art_label_category: 'பிரிவு (Category)',
    art_label_featured_img: 'முக்கிய அட்டைப் படம் (Featured Image)',
    art_label_dropzone: 'படத்தை இங்கே இழுத்துப் போடவும் அல்லது பதிவேற்ற கிளிக் செய்க',
    art_label_img_url_ph: 'அல்லது படத்தின் நேரடி URL முகவரியை உள்ளிடவும்',
    art_label_img_caption: 'படக் குறிப்பு / ஆதாரம் (Image Caption / Source)',
    art_label_toggles: 'செய்தி வகை விருப்பங்கள் (Highlights)',
    art_toggle_breaking: 'முக்கிய செய்தி (Breaking News Ticker)',
    art_toggle_featured: 'தலைப்புச் செய்தி (Featured Hero Carousel)',
    art_toggle_editors_pick: 'ஆசிரியர் தேர்வு (Editor\'s Pick)',
    art_label_tags: 'குறிச்சொற்கள் (Tags)',
    art_ph_tags: 'குறிச்சொல் தட்டச்சு செய்து Enter அழுத்தவும்...',
    art_btn_save: 'செய்தியை சேமிக்க (Save Article)',

    // Categories Page
    cat_title: 'பிரிவுகள் மேலாண்மை (Categories)',
    cat_subtitle: 'செய்திப் பிரிவுகளை உருவாக்க, திருத்த மற்றும் மறுவரிசைப்படுத்தலாம்.',
    cat_form_add_title: 'புதிய பிரிவு சேர்க்க (Add Category)',
    cat_form_edit_title: 'பிரிவை திருத்து (Edit Category)',
    cat_label_name_ta: 'பிரிவு பெயர் (தமிழ்)',
    cat_label_name_en: 'பிரிவு பெயர் (English)',
    cat_label_desc: 'விளக்கம் (Description)',
    cat_label_order: 'காட்சி வரிசை (Display Order)',
    cat_btn_save: '+ பிரிவைச் சேமி (Save Category)',
    cat_table_title: 'தற்போதுள்ள பிரிவுகள் (All Categories)',

    // Media Library
    media_title: 'மீடியா நூலகம் (Media Assets Library)',
    media_subtitle: 'செய்திகளுக்கு பதிவேற்றப்பட்ட புகைப்படங்கள் மற்றும் ஊடகக் கோப்புகள்.',
    media_btn_upload: 'புதிய படம் பதிவேற்றுக (Upload Image)',
    media_format_hint: 'அனுமதிக்கப்பட்ட வடிவங்கள்: JPG, PNG, WEBP, GIF, SVG (அதிகபட்சம் 5MB)',
    media_saved_files: 'சேமிக்கப்பட்ட கோப்புகள் (Uploaded Files)',
    media_copy_url: 'Copy URL',
    media_empty: 'இன்னும் படங்கள் பதிவேற்றப்படவில்லை.',

    // Settings Page
    settings_title: 'தள அமைப்புகள் (Site Settings)',
    settings_subtitle: 'வலைத்தளத்தின் அடையாளங்கள், தொடர்புகள், சமூக ஊடகங்கள் மற்றும் விளம்பர அமைப்புகள்.',
    settings_branding: 'அடையாளம் & அடிப்படை (Branding)',
    settings_site_name: 'தளத்தின் பெயர் (Site Name)',
    settings_tagline: 'தளத்தின் தமிழ் முழக்கம் (Tagline)',
    settings_meta_desc: 'தள விவரிப்பு (Site Meta Description)',
    settings_enable_ticker: 'முக்கிய செய்திகள் டிக்கரை இயக்கு (Enable Breaking Ticker)',
    settings_contact: 'தொடர்பு விவரங்கள் (Contact Details)',
    settings_email: 'அலுவலக மின்னஞ்சல் (Contact Email)',
    settings_phone: 'தொலைபேசி எண் (Contact Phone)',
    settings_address: 'முகவரி (Office Address)',
    settings_social: 'சமூக ஊடக இணைப்புகள் (Social Media URLs)',
    settings_btn_save: 'அமைப்புகளைச் சேமி (Save Settings)',

    // Profile Page
    profile_title: 'சுயவிவரம் & பாதுகாப்பு (My Profile & Security)',
    profile_subtitle: 'நிர்வாக கணக்கின் விவரங்கள் மற்றும் கடவுச்சொல்லை மாற்றலாம்.',
    profile_account_info: 'சுயவிவர தகவல்கள் (Account Profile)',
    profile_email_readonly: 'மின்னஞ்சல் (Email - மாற்ற முடியாது)',
    profile_role_readonly: 'பங்கு (Role)',
    profile_name: 'பெயர் (Full Name)',
    profile_bio: 'சுயவிவரக் குறிப்பு (Author Bio)',
    profile_change_pwd: 'கடவுச்சொல் மாற்றுதல் (Change Password)',
    profile_curr_pwd: 'தற்போதைய கடவுச்சொல் (Current Password)',
    profile_curr_pwd_help: 'கடவுச்சொல்லை மாற்ற விரும்பினால் மட்டுமே இதை நிரப்பவும்.',
    profile_new_pwd: 'புதிய கடவுச்சொல் (New Password)',
    profile_btn_save: 'சுயவிவரத்தை புதுப்பி (Save Profile)',

    // Modals & Alerts
    modal_confirm: 'உறுதி செய் (Confirm)',
    modal_cancel: 'ரத்து (Cancel)',
    modal_delete_art_title: 'செய்தியை நீக்கவா?',
    modal_delete_art_msg: 'இந்த செய்தியை நிச்சயமாக நீக்க விரும்புகிறீர்களா? இதை மீட்டெடுக்க முடியாது.',
    modal_delete_cat_title: 'பிரிவை நீக்கவா?',
    modal_delete_cat_msg: 'இந்த பிரிவை நீக்க விரும்புகிறீர்களா? இதிலுள்ள செய்திகள் பாதிக்கப்படலாம்.',
    modal_delete_media_title: 'படத்தை நீக்கவா?',
    modal_delete_media_msg: 'இந்த மீடியா கோப்பை நிச்சயமாக நீக்க விரும்புகிறீர்களா?',
    toast_copied: 'முகவரி நகலெடுக்கப்பட்டது! (URL Copied)',
    toast_deleted: 'வெற்றிகரமாக நீக்கப்பட்டது!'
  },

  en: {
    // Navigation & Common
    nav_main: 'Main Navigation',
    nav_dashboard: 'Dashboard Overview',
    nav_content: 'Content Management',
    nav_all_articles: 'All Articles',
    nav_new_article: 'New Article',
    nav_categories: 'Categories',
    nav_media: 'Media Assets',
    nav_pages: 'Important Pages (CMS)',
    nav_config: 'Configuration',
    nav_redirects: 'URL Redirects',
    nav_errors: 'Error Monitoring',
    nav_settings: 'Site Settings',
    nav_profile: 'My Profile',
    nav_visit_site: 'Visit Public Site',
    topbar_title: 'KKK Media Editorial CMS',
    topbar_view_site: 'View Site',
    topbar_new_article: '+ New Article',
    lang_menu_title: 'Admin Language / நிர்வாக மொழி',
    btn_logout: 'Logout',
    theme_toggle: 'Dark / Light Mode Toggle',

    // Login View
    login_portal_desc: 'Editorial Management CMS Portal',
    login_email_label: 'Email Address',
    login_password_label: 'Password',
    login_btn: 'Sign In to CMS',
    login_default_creds: 'Default Admin:',
    login_back_home: '← Return to Public Website',

    // Dashboard View
    dash_title: 'Dashboard Overview',
    dash_subtitle_prefix: 'Welcome',
    dash_subtitle_suffix: '! KKK Media news portal is running smoothly.',
    dash_btn_new: 'Write New Article',
    dash_stat_total: 'Total Articles',
    dash_stat_published: 'Published',
    dash_stat_drafts: 'Drafts',
    dash_stat_scheduled: 'Scheduled',
    dash_stat_categories: 'Categories',
    dash_stat_views: 'Total Views',
    dash_recent_articles: 'Recent Articles',
    dash_view_all: 'View All →',
    dash_recent_activity: 'Recent Activity Logs',

    // Table Headers & Actions
    th_image: 'Image',
    th_title: 'Headline',
    th_category: 'Category',
    th_author: 'Author',
    th_status: 'Status',
    th_highlights: 'Highlights',
    th_views: 'Views',
    th_date: 'Date',
    th_order: 'Order',
    th_slug: 'URL Slug',
    th_article_count: 'Articles',
    th_actions: 'Actions',
    btn_edit: 'Edit',
    btn_delete: 'Delete',
    btn_view: 'View',
    status_published: 'Published',
    status_draft: 'Draft',
    status_scheduled: 'Scheduled',

    // Articles List Page
    art_list_title: 'Articles Management',
    art_list_subtitle_prefix: 'Total of',
    art_list_subtitle_suffix: 'articles recorded.',
    art_filter_search_ph: 'Search headline or content...',
    art_filter_all_cats: 'All Categories',
    art_filter_all_status: 'All Statuses',
    art_btn_filter: 'Filter',
    art_btn_clear_filter: 'Clear Filters',
    art_badge_breaking: 'Breaking',
    art_badge_featured: 'Featured',
    art_empty: 'No articles found matching criteria.',

    // Article Form Page
    art_form_create_title: 'Create New Article',
    art_form_edit_title: 'Edit Article',
    art_form_create_subtitle: 'Publish breaking or feature news articles to KKK Media.',
    art_form_back_list: '← Return to Articles List',
    art_label_headline: 'Article Headline',
    art_ph_headline: 'Enter engaging and clear headline...',
    art_label_slug: 'Web URL Slug',
    art_help_slug: 'Auto-generated when headline loses focus or leave blank.',
    art_label_excerpt: 'Short Description / Excerpt',
    art_ph_excerpt: 'Key 2-3 lines summarizing the news story...',
    art_help_excerpt: 'Appears on homepage news cards and social media preview snippets.',
    art_label_content: 'Full Article Story (HTML & Text)',
    art_label_seo_title: 'SEO Search Engine Title (Meta Title)',
    art_label_seo_desc: 'SEO Meta Description',
    art_label_publish_settings: 'Publishing Settings',
    art_label_status: 'Publication Status',
    art_label_schedule_time: 'Scheduled Publish Time',
    art_label_category: 'Primary Category',
    art_label_featured_img: 'Featured Cover Image',
    art_label_dropzone: 'Drag & drop image here or click to browse files',
    art_label_img_url_ph: 'Or paste direct image URL address',
    art_label_img_caption: 'Image Caption / Photo Credit',
    art_label_toggles: 'Story Highlights & Placement',
    art_toggle_breaking: 'Breaking News Ticker',
    art_toggle_featured: 'Hero Featured Carousel',
    art_toggle_editors_pick: 'Editor\'s Top Pick',
    art_label_tags: 'Tags & Keywords',
    art_ph_tags: 'Type tag and press Enter...',
    art_btn_save: 'Save & Commit Article',

    // Categories Page
    cat_title: 'Categories Management',
    cat_subtitle: 'Create, edit, organize and re-order news taxonomy categories.',
    cat_form_add_title: 'Add New Category',
    cat_form_edit_title: 'Edit Category',
    cat_label_name_ta: 'Category Name (Tamil)',
    cat_label_name_en: 'Category Name (English)',
    cat_label_desc: 'Category Description',
    cat_label_order: 'Display Order',
    cat_btn_save: '+ Save Category',
    cat_table_title: 'Existing Categories',

    // Media Library
    media_title: 'Media Assets Library',
    media_subtitle: 'Uploaded images, photographs and media files for news articles.',
    media_btn_upload: 'Upload New Image',
    media_format_hint: 'Allowed file formats: JPG, PNG, WEBP, GIF, SVG (Max 5MB)',
    media_saved_files: 'Stored Media Files',
    media_copy_url: 'Copy URL',
    media_empty: 'No media uploaded yet.',

    // Settings Page
    settings_title: 'Portal & Site Settings',
    settings_subtitle: 'Configure branding, contact details, social links, and advertising options.',
    settings_branding: 'Branding & Identification',
    settings_site_name: 'Site Name',
    settings_tagline: 'Site Tagline',
    settings_meta_desc: 'Site Meta Description',
    settings_enable_ticker: 'Enable Breaking News Ticker on Public Portal',
    settings_contact: 'Contact Information',
    settings_email: 'Editorial Contact Email',
    settings_phone: 'Editorial Office Phone',
    settings_address: 'Office Postal Address',
    settings_social: 'Social Media Profiles',
    settings_btn_save: 'Save Site Settings',

    // Profile Page
    profile_title: 'My Profile & Security',
    profile_subtitle: 'Update your account administrator profile and change password.',
    profile_account_info: 'Account Profile Details',
    profile_email_readonly: 'Email (Permanent)',
    profile_role_readonly: 'Role',
    profile_name: 'Full Name',
    profile_bio: 'Author Bio',
    profile_change_pwd: 'Change Password',
    profile_curr_pwd: 'Current Password',
    profile_curr_pwd_help: 'Leave blank if you do not want to change your password.',
    profile_new_pwd: 'New Password',
    profile_btn_save: 'Update My Profile',

    // Modals & Alerts
    modal_confirm: 'Confirm',
    modal_cancel: 'Cancel',
    modal_delete_art_title: 'Delete Article?',
    modal_delete_art_msg: 'Are you sure you want to permanently delete this article? This action cannot be undone.',
    modal_delete_cat_title: 'Delete Category?',
    modal_delete_cat_msg: 'Are you sure you want to delete this category? Associated articles may be affected.',
    modal_delete_media_title: 'Delete Media File?',
    modal_delete_media_msg: 'Are you sure you want to delete this uploaded media file?',
    toast_copied: 'Asset URL copied to clipboard!',
    toast_deleted: 'Successfully deleted!'
  }
};

// Apply language translations to the Admin Portal DOM
function applyAdminLanguage(lang) {
  const chosenLang = (lang === 'en' || lang === 'ta') ? lang : 'ta';
  const dict = ADMIN_TRANSLATIONS[chosenLang] || ADMIN_TRANSLATIONS.ta;

  document.documentElement.setAttribute('lang', chosenLang);
  document.documentElement.setAttribute('data-admin-lang', chosenLang);
  try {
    localStorage.setItem('kkk_admin_lang', chosenLang);
  } catch (e) {}

  // Update topbar trigger label
  const currentLabelEl = document.getElementById('adminLangCurrentLabel');
  if (currentLabelEl) {
    currentLabelEl.textContent = chosenLang === 'en' ? 'English' : 'தமிழ்';
  }

  // Update active option checkmark
  document.querySelectorAll('.admin-lang-option').forEach(opt => {
    const optLang = opt.getAttribute('data-lang');
    if (optLang === chosenLang) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });

  // Translate text content
  document.querySelectorAll('[data-admin-i18n]').forEach(el => {
    const key = el.getAttribute('data-admin-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Translate placeholders
  document.querySelectorAll('[data-admin-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-admin-i18n-ph');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  // Translate titles / tooltips
  document.querySelectorAll('[data-admin-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-admin-i18n-title');
    if (dict[key]) {
      el.setAttribute('title', dict[key]);
    }
  });
}

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
  // 0. Admin Language Switcher Initialization
  const initialLang = localStorage.getItem('kkk_admin_lang') || 'ta';
  applyAdminLanguage(initialLang);

  const adminLangBtn = document.getElementById('adminLangBtn');
  const adminLangWrap = document.getElementById('adminLangWrap');
  if (adminLangBtn && adminLangWrap) {
    adminLangBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = adminLangWrap.classList.toggle('open');
      adminLangBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.querySelectorAll('.admin-lang-option').forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedLang = option.getAttribute('data-lang');
        applyAdminLanguage(selectedLang);
        adminLangWrap.classList.remove('open');
        adminLangBtn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!adminLangWrap.contains(e.target)) {
        adminLangWrap.classList.remove('open');
        adminLangBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 1. Mobile Sidebar Toggle
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const adminSidebar = document.getElementById('adminSidebar');
  if (sidebarToggleBtn && adminSidebar) {
    sidebarToggleBtn.addEventListener('click', () => {
      adminSidebar.classList.toggle('open');
    });
  }

  // 1.1 Admin Theme Toggle
  const adminThemeToggleBtn = document.getElementById('adminThemeToggleBtn');
  if (adminThemeToggleBtn) {
    adminThemeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      try {
        localStorage.setItem('kkk_theme', newTheme);
      } catch (e) {}
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

    // Helper function to generate clean URL slug
    const makeSlug = (text) => {
      return (text || '')
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    };

    // Auto slug from English/Tamil title if slug is empty or user is typing new article
    if (titleInput && slugInput) {
      titleInput.addEventListener('blur', () => {
        if (!slugInput.value.trim()) {
          const val = titleInput.value.trim();
          const cleanSlug = makeSlug(val);
          slugInput.value = cleanSlug || `news-${Date.now()}`;
        }
      });
    }

    // 2.0 In-form Language Conversion (English <-> Tamil)
    const translateApiCall = async (textOrTexts, targetLang, sourceLang = 'auto') => {
      const isBatch = Array.isArray(textOrTexts);
      const body = isBatch
        ? { texts: textOrTexts, targetLang, sourceLang }
        : { text: textOrTexts, targetLang, sourceLang };

      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error('Translation service unavailable');
      return await res.json();
    };

    // Mini Translation Buttons for individual fields
    document.querySelectorAll('.btn-trans-mini').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-trans-target');
        const dir = btn.getAttribute('data-trans-dir');
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;

        const originalText = targetEl.value;
        if (!originalText || !originalText.trim()) {
          showToast('மொழிபெயர்க்க உரையை உள்ளிடவும் (Please enter text to translate)', 'warning');
          targetEl.focus();
          return;
        }

        const origBtnHtml = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<span class="trans-loading-spinner"></span>';

        try {
          const targetLang = dir === 'ta2en' ? 'en' : 'ta';
          const sourceLang = dir === 'ta2en' ? 'ta' : 'en';
          const data = await translateApiCall(originalText, targetLang, sourceLang);

          if (data && data.success && data.translatedText) {
            targetEl.value = data.translatedText;
            targetEl.dispatchEvent(new Event('input'));

            // If translating Title to English, automatically populate clean slug
            if (targetId === 'articleTitle' && dir === 'ta2en' && slugInput) {
              const newSlug = makeSlug(data.translatedText);
              if (newSlug) {
                slugInput.value = newSlug;
              }
            }

            showToast(
              targetLang === 'en'
                ? 'ஆங்கிலத்தில் மொழிபெயர்க்கப்பட்டது! (Translated to English)'
                : 'தமிழில் மொழிபெயர்க்கப்பட்டது! (Translated to Tamil)',
              'success'
            );
          }
        } catch (err) {
          showToast('மொழிபெயர்ப்பு தோல்வியடைந்தது: ' + err.message, 'danger');
        } finally {
          btn.disabled = false;
          btn.innerHTML = origBtnHtml;
        }
      });
    });

    // Translate All (Ta -> En and En -> Ta)
    const btnAllTaToEn = document.getElementById('btnTranslateAllTaToEn');
    const btnAllEnToTa = document.getElementById('btnTranslateAllEnToTa');

    const handleTranslateAll = async (targetLang, sourceLang, activeBtn) => {
      const title = titleInput ? titleInput.value.trim() : '';
      const excerpt = document.getElementById('shortDescription')?.value.trim() || '';
      const content = document.getElementById('fullContent')?.value.trim() || '';

      if (!title && !excerpt && !content) {
        showToast('மொழிபெயர்க்க தலைப்பு அல்லது விவரத்தை உள்ளிடவும்', 'warning');
        return;
      }

      const origText = activeBtn.innerHTML;
      activeBtn.disabled = true;
      activeBtn.innerHTML = '<span class="trans-loading-spinner"></span> மொழிபெயர்க்கப்படுகிறது...';

      try {
        const textsToTranslate = [title, excerpt, content];
        const data = await translateApiCall(textsToTranslate, targetLang, sourceLang);

        if (data && data.success && Array.isArray(data.translations)) {
          const [tTitle, tExcerpt, tContent] = data.translations;
          if (titleInput && tTitle) titleInput.value = tTitle;
          const shortDescEl = document.getElementById('shortDescription');
          if (shortDescEl && tExcerpt) shortDescEl.value = tExcerpt;
          const fullContentEl = document.getElementById('fullContent');
          if (fullContentEl && tContent) fullContentEl.value = tContent;

          if (targetLang === 'en' && slugInput && tTitle) {
            const cleanSlug = makeSlug(tTitle);
            if (cleanSlug) slugInput.value = cleanSlug;
          }

          showToast(
            targetLang === 'en'
              ? 'முழு செய்தியும் ஆங்கிலத்தில் மாற்றப்பட்டது! (Article translated to English)'
              : 'முழு செய்தியும் தமிழில் மாற்றப்பட்டது! (Article translated to Tamil)',
            'success'
          );
        }
      } catch (err) {
        showToast('மொழிபெயர்ப்பு தோல்வியடைந்தது: ' + err.message, 'danger');
      } finally {
        activeBtn.disabled = false;
        activeBtn.innerHTML = origText;
      }
    };

    if (btnAllTaToEn) {
      btnAllTaToEn.addEventListener('click', (e) => {
        e.preventDefault();
        handleTranslateAll('en', 'ta', btnAllTaToEn);
      });
    }

    if (btnAllEnToTa) {
      btnAllEnToTa.addEventListener('click', (e) => {
        e.preventDefault();
        handleTranslateAll('ta', 'en', btnAllEnToTa);
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
