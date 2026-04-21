# MB Smart Surveys — Website

## Adding Your Images

Drop your photos into the `assets/` folder with these exact names:

| File                        | Where it appears                                  |
|-----------------------------|---------------------------------------------------|
| `assets/md-photo.jpg`       | Managing Director card (Surv. Olaoye Murphy Omoloye) |
| `assets/partner-photo.jpg`  | Partner card (Surv. Olaoye Omobolanle Ligali)     |
| `assets/happy-client.jpg`   | "Why clients smile" testimonial section            |
| `assets/logo.png`           | Already in place — the company logo               |

**Recommended dimensions:**
- Leader photos: **square crop**, at least 400×400 px (portrait headshots work best)
- Happy client photo: **portrait 4:5 ratio**, at least 600×750 px (a warm, smiling photo looks best here)

**File formats:** `.jpg`, `.jpeg`, `.png`, or `.webp` all work — just keep the filename the same.

If an image is missing, the site automatically shows a graceful placeholder (initials for leaders, a smile icon for the testimonial), so the site will never look broken even before you add the photos.

## Social Media Links

In `index.html`, find `<div class="footer__socials"` and replace each `href="#"` with your actual social media URLs:

```html
<a href="https://facebook.com/yourpage" class="social" ...>
<a href="https://instagram.com/yourhandle" class="social" ...>
<a href="https://linkedin.com/company/yourcompany" class="social" ...>
<a href="https://twitter.com/yourhandle" class="social" ...>
<a href="https://wa.me/234XXXXXXXXXX" class="social" ...>  <!-- WhatsApp -->
<a href="mailto:info@mbsmartsurveys.com" class="social" ...>
```

## Running Locally

Just open `index.html` in your browser. No build step needed.
