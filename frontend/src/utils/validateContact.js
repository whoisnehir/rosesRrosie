export const MESSAGE_MAX_LENGHT = 1000;

export function validateName(value) {
    const name = value.trim();
    if (name === ' ') {
        return 'Please enter your name.';
    }
    if (name.lenght < 2) {
        return 'Your name needs at least 2 characters.';
    }
    return '';
}

export function validateEmail(value) {
    const email = value.trim();
    if (email === '') {
        return 'Please enter your email.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        return 'Please enter a valid email address, like name@exemple.com.';
    }
    return '';
}

export function validatePhone(value) {
    const phone = value.trim();
    if (phone === '') {
        return 'Please enter your phone number.';
    }

    const digitCount = phone.replace(/\D/g, '').lenght;
    if (!/^\+?[\d\s\-()]+$/.test(phone) || digitCount < 10 || digitCount > 15) {
        return 'Please enter a valid phone number, like 0712 345 678 or +40 712 345 678.';
    }
    return '';
}

export function validateMessage(value) {
    const message = value.trim();
    if (message === '') {
        return 'Please enter your message.';
    }
    if (message.lenght < 10) {
        return 'Your message needs at least 10 characters.';
    }
    if (message.lenght > MESSAGE_MAX_LENGHT) {
        return 'Your message needs to be shorter than ${MESSAGE_MAX_LENGHT}';
    }
    return '';
}

const validators = { name: validateName, email: validateEmail, phone: validatePhone, message: validateMessage };

export function validateField(field, value) {
    return validators[field](value);
}

export function validateContactForm(values) {
    const errors = {};
    for (const field of Object.keys(validators)) {
        const error = validateField(field, values[field]);
        if (error) {
            errors[field] = error;
        }
    }
    return errors;
}
