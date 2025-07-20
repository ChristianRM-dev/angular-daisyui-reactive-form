# 🌿 Modern Form Fields in Angular 20 (with Signals, Tailwind, and DaisyUI)

This project demonstrates how to build reusable, validated form field components in Angular 20 using:

- ✅ **Standalone Components**
- ⚡ **Signals API**
- 🎨 **Tailwind CSS + DaisyUI**
- 🧩 **ControlValueAccessor**
- 🧼 Fully typed `ReactiveForms`

> 📝 Inspired by the blog post:  
> [Modern Form Fields in Angular 20 with Signals and Tailwind](https://your-blog-url.com/angular-form-fields)

---

## 📦 What’s Included

- `FormInput` – A reusable input component that integrates with Angular forms via `ControlValueAccessor`.
- `FormField` – A wrapper component that renders a label, projected input, validation hints, and error messages.
- A complete demo form using the `UserForm` interface with strongly-typed controls.
- DaisyUI for clean, responsive input styling (dark mode ready 🎯).

---

## 🚀 Quick Preview

```html
<app-form-field
  label="Email"
  [control]="form.get('email')!"
  [required]="true"
  [customErrors]="{ email: 'Invalid email' }"
>
  <app-form-input
    formControlName="email"
    placeholder="Enter your email"
    type="email"
  />
</app-form-field>
```


## ✅ Features

  

- Reusable with formControlName

- Custom error messages via @Input()

- Compatible with Tailwind / DaisyUI

- Full dark mode support

- Signals-based reactive error state

- Ready for extension (FormSelect, FormTextarea, etc.)

  

## ✨ Want to Extend It?

- Add input icons (iconLeft, iconRight)

- Add FormSelect, FormTextarea, etc.

- Add i18n error support (ngx-translate)

- Add validation hint badges or animated error messages

  

## 📄 License

MIT — free to use, modify, or build on.

  

## 👨‍💻 Author

Christian Rios

[Portfolio](https://christianrios.dev/) • [GitHub](https://github.com/ChristianRM-dev) • [LinkedIn](https://www.linkedin.com/in/christian-rm-dev/)
