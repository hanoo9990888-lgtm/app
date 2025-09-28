// script.js - ملف الجافاسكريبت المستقل (محدث مع لون خط أسود لخانة المناسبات)

document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('requestForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const instagramInput = document.getElementById('instagram');
    const whatsappInput = document.getElementById('whatsapp');
    const emailField = document.getElementById('emailField');
    const instagramField = document.getElementById('instagramField');
    const whatsappField = document.getElementById('whatsappField');
    const preferredContactRadios = document.querySelectorAll('input[name="preferredContact"]');
    const occasionTypeSelect = document.getElementById('occasionType');
    const occasionDateInput = document.getElementById('occasionDate');
    const descriptionTextarea = document.getElementById('description');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const successContactInfo = document.getElementById('successContactInfo');
    const errorMessage = document.getElementById('errorMessage');
    
    // Error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const instagramError = document.getElementById('instagramError');
    const whatsappError = document.getElementById('whatsappError');
    const occasionTypeError = document.getElementById('occasionTypeError');
    const occasionDateError = document.getElementById('occasionDateError');
    const descriptionError = document.getElementById('descriptionError');
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            const isExpanded = mobileMenu.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
            
            // Change icon based on state
            if (isExpanded) {
                mobileMenuToggle.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                `;
            } else {
                mobileMenuToggle.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                `;
            }
        });
    }
    
    // Handle window resize for mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                `;
            }
        }
    });
    
    // Toggle contact fields based on preferred contact method
    preferredContactRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Hide all fields first
            emailField.style.display = 'none';
            instagramField.style.display = 'none';
            whatsappField.style.display = 'none';
            
            // Clear all fields and errors
            emailInput.value = '';
            instagramInput.value = '';
            whatsappInput.value = '';
            clearError(emailError);
            clearError(instagramError);
            clearError(whatsappError);
            
            // Show the selected field
            if (this.value === 'email') {
                emailField.style.display = 'block';
            } else if (this.value === 'instagram') {
                instagramField.style.display = 'block';
            } else if (this.value === 'whatsapp') {
                whatsappField.style.display = 'block';
            }
        });
    });
    
    // Clear error function
    function clearError(errorElement) {
        errorElement.textContent = '';
        const input = errorElement.previousElementSibling;
        if (input && input.classList.contains('error')) {
            input.classList.remove('error');
        }
    }
    
    // Sanitize input to prevent XSS attacks
    function sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        return input
            .replace(/</g, "<")
            .replace(/>/g, ">")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;")
            .replace(/\//g, "&#x2F;")
            .replace(/`/g, "&#x60;")
            .replace(/=/g, "&#x3D;");
    }
    
    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(email);
    }
    
    // Validate instagram username
    function isValidInstagramUsername(username) {
        const instagramRegex = /^[a-zA-Z0-9._]{1,30}$/;
        return instagramRegex.test(username);
    }
    
    // Validate whatsapp number
    function isValidWhatsAppNumber(number) {
        // Remove all non-digit characters
        const cleanNumber = number.replace(/\D/g, '');
        // Check if it starts with 966 and has 12 digits total (966 + 9 digits)
        return cleanNumber.startsWith('966') && cleanNumber.length === 12;
    }
    
    // Format whatsapp number for display
    function formatWhatsAppNumber(number) {
        // Remove all non-digit characters
        const cleanNumber = number.replace(/\D/g, '');
        // Format as +966 XX XXX XXXX
        if (cleanNumber.length >= 4) {
            return `+${cleanNumber.substring(0, 3)} ${cleanNumber.substring(3, 5)} ${cleanNumber.substring(5, 8)} ${cleanNumber.substring(8, 12)}`;
        }
        return `+${cleanNumber}`;
    }
    
    // Validate form
    function validateForm() {
        let isValid = true;
        
        // Reset all errors
        nameError.textContent = '';
        emailError.textContent = '';
        instagramError.textContent = '';
        whatsappError.textContent = '';
        occasionTypeError.textContent = '';
        occasionDateError.textContent = '';
        descriptionError.textContent = '';
        
        // Name validation
        const nameValue = nameInput.value.trim();
        if (!nameValue) {
            nameError.textContent = 'الاسم مطلوب';
            nameInput.classList.add('error');
            isValid = false;
        } else if (nameValue.length > 100) {
            nameError.textContent = 'الاسم لا يمكن أن يتجاوز 100 حرف';
            nameInput.classList.add('error');
            isValid = false;
        } else {
            nameInput.classList.remove('error');
        }
        
        // Contact method validation based on preferred contact
        const preferredContact = document.querySelector('input[name="preferredContact"]:checked').value;
        
        if (preferredContact === 'email') {
            const emailValue = emailInput.value.trim();
            if (!emailValue) {
                emailError.textContent = 'البريد الإلكتروني مطلوب';
                emailInput.classList.add('error');
                isValid = false;
            } else if (!isValidEmail(emailValue)) {
                emailError.textContent = 'يرجى إدخال بريد إلكتروني صحيح';
                emailInput.classList.add('error');
                isValid = false;
            } else {
                emailInput.classList.remove('error');
            }
        } else if (preferredContact === 'instagram') {
            const instagramValue = instagramInput.value.trim();
            if (!instagramValue) {
                instagramError.textContent = 'حساب الانستقرام مطلوب';
                instagramInput.classList.add('error');
                isValid = false;
            } else if (!isValidInstagramUsername(instagramValue)) {
                instagramError.textContent = 'اسم المستخدم غير صحيح (يجب أن يحتوي فقط على أحرف وأرقام ونقاط وشرطات سفلية)';
                instagramInput.classList.add('error');
                isValid = false;
            } else if (instagramValue.length > 30) {
                instagramError.textContent = 'اسم المستخدم لا يمكن أن يتجاوز 30 حرف';
                instagramInput.classList.add('error');
                isValid = false;
            } else {
                instagramInput.classList.remove('error');
            }
        } else if (preferredContact === 'whatsapp') {
            const whatsappValue = whatsappInput.value.trim();
            if (!whatsappValue) {
                whatsappError.textContent = 'رقم واتساب مطلوب';
                whatsappInput.classList.add('error');
                isValid = false;
            } else if (!isValidWhatsAppNumber(whatsappValue)) {
                whatsappError.textContent = 'يرجى إدخال رقم واتساب سعودي صحيح (يبدأ بـ 966)';
                whatsappInput.classList.add('error');
                isValid = false;
            } else {
                whatsappInput.classList.remove('error');
            }
        }
        
        // Occasion type validation
        if (!occasionTypeSelect.value) {
            occasionTypeError.textContent = 'يرجى اختيار نوع المناسبة';
            occasionTypeSelect.classList.add('error');
            isValid = false;
        } else {
            occasionTypeSelect.classList.remove('error');
        }
        
        // Occasion date validation
        if (!occasionDateInput.value) {
            occasionDateError.textContent = 'تاريخ المناسبة مطلوب';
            occasionDateInput.classList.add('error');
            isValid = false;
        } else {
            // Check if date is not in the past
            const selectedDate = new Date(occasionDateInput.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                occasionDateError.textContent = 'لا يمكن اختيار تاريخ في الماضي';
                occasionDateInput.classList.add('error');
                isValid = false;
            } else {
                occasionDateInput.classList.remove('error');
            }
        }
        
        // Description validation
        const descriptionValue = descriptionTextarea.value.trim();
        if (!descriptionValue) {
            descriptionError.textContent = 'الوصف مطلوب';
            descriptionTextarea.classList.add('error');
            isValid = false;
        } else if (descriptionValue.length < 10) {
            descriptionError.textContent = 'الوصف يجب أن يحتوي على 10 أحرف على الأقل';
            descriptionTextarea.classList.add('error');
            isValid = false;
        } else if (descriptionValue.length > 1000) {
            descriptionError.textContent = 'الوصف لا يمكن أن يتجاوز 1000 حرف';
            descriptionTextarea.classList.add('error');
            isValid = false;
        } else {
            descriptionTextarea.classList.remove('error');
        }
        
        return isValid;
    }
    
    // Show success message with dynamic contact info
    function showSuccessMessage(preferredContact, contactValue) {
        let contactInfoText = '';
        
        if (preferredContact === 'email') {
            contactInfoText = `سيتم إرسال طلبك مباشرة إلى حسابي على البريد الإلكتروني: <strong>${contactValue}</strong>`;
        } else if (preferredContact === 'instagram') {
            contactInfoText = `سيتم إرسال طلبك مباشرة إلى حسابي على الانستقرام: <strong>@${contactValue}</strong>`;
        } else if (preferredContact === 'whatsapp') {
            const formattedNumber = formatWhatsAppNumber(contactValue);
            contactInfoText = `سيتم إرسال طلبك مباشرة إلى رقمي على واتساب: <strong>${formattedNumber}</strong>`;
        }
        
        successContactInfo.innerHTML = contactInfoText;
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        
        // Hide success message after 5 seconds
        setTimeout(function() {
            successMessage.style.display = 'none';
        }, 5000);
    }
    
    // Show error message
    function showErrorMessage() {
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
    }
    
    // Get occasion type text
    function getOccasionTypeText(value) {
        const occasions = {
            'birthday': 'عيد ميلاد',
            'national': 'مناسبة وطنية',
            'annual': 'عيد سنوي',
            'wedding': 'زفاف',
            'graduation': 'تخرج',
            'custom': 'طلب خاص'
        };
        return occasions[value] || value;
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<div class="spinner"></div> جاري الإرسال...';
            submitBtn.classList.add('loading');
            
            // Get form data
            const formData = {
                name: sanitizeInput(nameInput.value.trim()),
                preferredContact: document.querySelector('input[name="preferredContact"]:checked').value,
                email: sanitizeInput(emailInput.value.trim()),
                instagram: sanitizeInput(instagramInput.value.trim()),
                whatsapp: sanitizeInput(whatsappInput.value.trim()),
                occasionType: sanitizeInput(occasionTypeSelect.value),
                occasionDate: occasionDateInput.value,
                budget: sanitizeInput(document.getElementById('budget').value.trim()),
                description: sanitizeInput(descriptionTextarea.value.trim()),
                paymentMethod: "تحويل بنكي",
                pricingNote: "المبلغ يعتمد على حسب الطلب",
                timestamp: new Date().toISOString()
            };
            
            // Get the preferred contact method and value
            const preferredContact = formData.preferredContact;
            let contactValue = '';
            
            if (preferredContact === 'email') {
                contactValue = formData.email;
                // Create mailto link for email - this will actually send the email to YOUR email
                const subject = 'طلب تصميم صفحة ويب';
                let body = `تم إرسال طلب تصميم صفحة ويب من خلال النموذج:\n\n`;
                body += `الاسم: ${formData.name}\n`;
                body += `طريقة التواصل: بريد إلكتروني\n`;
                body += `البريد الإلكتروني: ${formData.email}\n`;
                body += `نوع المناسبة: ${getOccasionTypeText(formData.occasionType)}\n`;
                body += `تاريخ المناسبة: ${formData.occasionDate}\n`;
                
                if (formData.budget) {
                    body += `الميزانية المتوقعة: ${formData.budget}\n`;
                }
                
                body += `الوصف: ${formData.description}\n`;
                body += `طريقة الدفع: تحويل بنكي\n`;
                body += `تم الإرسال في: ${new Date().toLocaleString('ar-SA')}\n`;
                
                // This will open the user's email client with pre-filled message TO YOUR EMAIL
                window.location.href = `mailto:joob99ksa2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
            } else if (preferredContact === 'whatsapp') {
                contactValue = formData.whatsapp;
                // Create WhatsApp link - this will actually send the message to YOUR WhatsApp number
                const cleanNumber = formData.whatsapp.replace(/\D/g, '');
                const message = `مرحباً، أود طلب تصميم صفحة ويب.\n\n` +
                              `الاسم: ${formData.name}\n` +
                              `نوع المناسبة: ${getOccasionTypeText(formData.occasionType)}\n` +
                              `تاريخ المناسبة: ${formData.occasionDate}\n` +
                              (formData.budget ? `الميزانية المتوقعة: ${formData.budget}\n` : '') +
                              `الوصف: ${formData.description}\n` +
                              `تم الإرسال في: ${new Date().toLocaleString('ar-SA')}`;
                
                // This will open WhatsApp with pre-filled message TO YOUR NUMBER
                window.open(`https://wa.me/966595949096?text=${encodeURIComponent(message)}`, '_blank');
                
            } else if (preferredContact === 'instagram') {
                contactValue = formData.instagram;
                // Open YOUR Instagram profile - user will need to send DM to YOUR account
                window.open('https://instagram.com/programmer_209', '_blank');
                
                // Show alert to guide user to send DM to YOUR account
                setTimeout(() => {
                    alert('تم فتح حسابي على الانستقرام (@programmer_209). يرجى إرسال رسالة مباشرة (DM) تحتوي على تفاصيل طلبك.');
                }, 1000);
            }
            
            // Show success message with the specific contact info
            setTimeout(() => {
                showSuccessMessage(preferredContact, contactValue);
            }, 2000);
            
            // Reset form
            setTimeout(() => {
                form.reset();
                document.querySelector('input[name="preferredContact"][value="email"]').checked = true;
                emailField.style.display = 'block';
                instagramField.style.display = 'none';
                whatsappField.style.display = 'none';
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'إرسال الطلب';
                submitBtn.classList.remove('loading');
            }, 3000);
        }
    });
    
    // Handle touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }
    
    // Handle orientation change for mobile devices
    window.addEventListener('orientationchange', function() {
        // Force reflow to fix any layout issues
        setTimeout(function() {
            window.scrollTo(0, 0);
        }, 100);
    });
    
    // Add focus management for accessibility
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusableContent = document.querySelectorAll(focusableElements);
            const firstFocusableElement = focusableContent[0];
            const lastFocusableElement = focusableContent[focusableContent.length - 1];
            
            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusableElement) {
                    e.preventDefault();
                    lastFocusableElement.focus();
                }
            } else { // Tab
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        }
    });
    
    // Add fallback for users who have JavaScript disabled
    document.addEventListener('DOMContentLoaded', function() {
        const noScriptMessage = document.createElement('div');
        noScriptMessage.innerHTML = `
            <noscript>
                <div style="background-color: #f87171; color: white; padding: 1rem; text-align: center; font-weight: bold; margin: 1rem;">
                    ⚠️ يرجى تفعيل JavaScript في متصفحك لاستخدام النموذج بشكل صحيح.
                    <br><br>
                    أو يمكنك التواصل معي مباشرة عبر حساباتي الخاصة:
                    <br>
                    <a href="mailto:joob99ksa2006@gmail.com" style="color: white; text-decoration: underline;">البريد الإلكتروني: joob99ksa2006@gmail.com</a>
                    <br>
                    <a href="https://instagram.com/programmer_209" target="_blank" style="color: white; text-decoration: underline;">الانستقرام: @programmer_209</a>
                    <br>
                    <a href="https://wa.me/966595949096" target="_blank" style="color: white; text-decoration: underline;">واتساب: +966 59 594 9096</a>
                </div>
            </noscript>
        `;
        document.body.insertBefore(noScriptMessage, document.body.firstChild);
    });
});