# Product Requirements Document (PRD)

## Kaushal Kalas — Personal Portfolio

| Field | Value |
|---|---|
| **Product** | Kaushal Kalas Personal Portfolio |
| **Document Type** | Product Requirements Document |
| **Status** | Draft |
| **Version** | 1.0 |
| **Platform** | Web |
| **Deployment** | GitHub Pages |
| **Primary Stack** | HTML, CSS, Vanilla JavaScript, GSAP |
| **Animation Layer** | GSAP + optional ScrollTrigger |
| **Primary Differentiator** | Interactive Debian-style terminal with built-in AI |
| **Audience** | Recruiters, hiring managers, developers, faculty, hackathon organizers, peers |

---

## 1. Executive Summary

The Kaushal Kalas Personal Portfolio is a fast, single-page personal portfolio designed to communicate Kaushal's identity as an AI/ML-focused developer while showcasing his technical work, education, achievements, and personal interests.

The portfolio will use a conventional website structure for easy navigation, but its defining feature will be an interactive **Debian-style simulated terminal**.

The terminal will act as a second interface to the portfolio. Visitors can run predefined commands such as:

```bash
kaushal@debian:~$ projects
kaushal@debian:~$ skills
kaushal@debian:~$ resume
kaushal@debian:~$ gallery
```

The AI assistant will **not** appear as a standalone chatbot. Instead, it will be integrated into the terminal and accessible through commands such as:

```bash
kaushal@debian:~$ ask What projects has Kaushal built?
```

The website must remain simple enough to deploy and maintain as a static GitHub Pages site.

---

# 2. Problem Statement

Most student and developer portfolios follow a predictable pattern:

- Hero
- About
- Skills
- Projects
- Contact

Although functional, this structure provides little interaction or personality.

This portfolio needs to solve two problems simultaneously:

1. **Communicate professional information quickly** to recruiters and other visitors.
2. **Provide a memorable interactive identity** without introducing unnecessary application complexity.

The Debian-style terminal addresses the second problem while preserving the accessibility of a normal portfolio.

---

# 3. Product Vision

Create a portfolio that feels like a **professional personal website first** and an **interactive developer experience second**.

The design should communicate:

> A technically curious AI/ML developer who builds things, experiments with ideas, and enjoys understanding how systems work.

The terminal should feel like a natural extension of that identity rather than a decorative gimmick.

---

# 3. Technology & Platform Requirements

## 3.1 Core Stack

```text
HTML
CSS
Vanilla JavaScript
GSAP
GSAP ScrollTrigger (optional)
```

## 3.2 Hosting

GitHub Pages.

## 3.3 Architecture Constraint

The site remains a static frontend application. GSAP is used only as the frontend motion layer and does not introduce a backend requirement.

---

# 4. Goals & Objectives

## 4.1 Primary Goals

- Present Kaushal clearly as an AI/ML-focused developer.
- Communicate his profile within the first few seconds of visiting.
- Showcase projects, skills, education, experience, achievements, and personal interests.
- Provide quick access to the resume.
- Create a memorable terminal-based interaction.
- Provide portfolio-aware AI through the terminal.
- Maintain excellent usability on desktop and mobile.
- Keep the implementation lightweight and GitHub Pages compatible.

## 4.2 Secondary Goals

- Demonstrate practical frontend skills.
- Demonstrate ability to create thoughtful user experiences.
- Keep portfolio content easy to update.
- Make the website shareable and SEO-friendly.

---

# 5. Non-Goals

The MVP will **not** include:

- User authentication
- User accounts
- Admin dashboards
- Database systems
- CMS
- Full backend application
- Custom AI model training
- Arbitrary Linux shell execution
- Complex server-side functionality
- Heavy animation frameworks
- Frontend frameworks used only for the sake of using a framework

The terminal is a **simulated portfolio terminal**, not a real Linux environment.

---

# 6. Target Users

## 6.1 Primary Users

### Recruiters / Hiring Managers
Need to quickly understand:

- Who Kaushal is
- What he works with
- What he has built
- How to contact him
- Where to download his resume

### Technical Reviewers / Developers
May explore:

- Projects
- Skills
- Technical experience
- Terminal interaction
- AI interface

### Faculty / Hackathon Organizers / Peers
May be interested in:

- Education
- Achievements
- Hackathons
- Personal interests
- Technical work

---

# 7. User Needs

Visitors should be able to:

1. Understand who Kaushal is quickly.
2. Find important information without learning the terminal.
3. Explore the portfolio interactively if they choose.
4. Download the resume easily.
5. View projects and technical skills.
6. Discover personal interests through the Gallery.
7. Ask portfolio-related questions through the terminal AI.
8. Contact Kaushal directly.

---

# 8. Information Architecture

The portfolio will be a single-page website.

```text
Home
│
├── Navbar
├── Hero
├── Terminal
├── About
├── Skills
├── Projects
├── Education
├── Experience
├── Achievements & Certifications
├── Gallery
├── Contact
└── Footer
```

The terminal should provide an alternate path to most of the same information.

---

# 9. Navigation Requirements

The navigation should remain compact.

### Primary Navigation

```text
Home
About
Skills
Projects
Gallery
Contact
```

### Requirements

- Sticky/fixed navigation on desktop.
- Responsive navigation on mobile.
- Smooth scrolling.
- Clear active-section indication where practical.
- No overcrowding.
- Navigation must remain usable without JavaScript where reasonably possible.

---

# 10. Hero Requirements

## 10.1 Purpose

The Hero is the primary introduction and must immediately establish:

- Name
- Professional identity
- Technical focus
- Personal positioning
- Primary actions

## 10.2 Required Content

- Profile image
- Name: **Kaushal Kalas**
- Professional title
- Short tagline/description
- Primary CTA
- Secondary CTA

### Example CTAs

```text
View Projects
Download Resume
```

## 10.3 Desktop Layout

```text
┌──────────────────────────────┬──────────────────┐
│ Name                         │                  │
│ Title                        │  Profile Image   │
│ Short introduction           │                  │
│ [View Projects] [Resume]     │                  │
└──────────────────────────────┴──────────────────┘
```

## 10.4 Mobile Layout

```text
Profile Image
Name
Title
Description
CTA buttons
```

## 10.5 Profile Image Requirements

- High-quality image.
- Responsive sizing.
- Correct aspect ratio.
- Descriptive `alt` text.
- Web-optimized file.
- Subtle visual treatment.
- No excessive filters or decorative effects.

---

# 11. About Requirements

## Purpose

Explain Kaushal beyond a list of technologies.

The section should communicate:

- Current academic/professional direction.
- Technical interests.
- What he enjoys building.
- Current learning focus.
- Long-term interests.
- General working mindset.

### Content Rule

Keep the section concise. Avoid an excessively long biography.

---

# 12. Skills Requirements

Skills should be grouped into meaningful categories.

### Suggested Categories

```text
Languages
Web Development
AI / Machine Learning
Databases
Tools & Platforms
Other
```

### Display Options

- Tags
- Compact cards
- Icons
- Categorized lists

### Avoid

- Arbitrary percentage skill bars.
- Fake numerical proficiency scores.
- Huge icon walls.
- Excessive animation.

---

# 13. Projects Requirements

Projects are a primary evaluation area.

## 13.1 Project Card

Each project should support:

```text
Project Name
Short Description
Problem / Purpose
Key Features
Technology Stack
GitHub Link
Live Demo (optional)
```

## 13.2 Project Hierarchy

```text
Featured Projects
        ↓
Other Projects
```

Featured projects should receive stronger visual emphasis.

## 13.3 Project Content Standard

Descriptions should answer:

1. What was built?
2. Why was it built?
3. What technologies were used?
4. What was technically interesting or important?

---

# 14. Education Requirements

Each education item may include:

```text
Degree
Institution
Location
Timeline
Specialization
```

Optional:

- Relevant coursework
- Academic highlights

The section should remain concise.

---

# 15. Experience Requirements

Relevant experience may include:

- Internships
- Research
- Freelance work
- Open-source work
- Major technical responsibilities
- Significant academic technical roles

Each entry may include:

```text
Role
Organization
Timeline
Responsibilities
Achievements / Outcomes
```

Where possible, emphasize measurable or concrete outcomes rather than generic responsibilities.

---

# 16. Achievements & Certifications

This section is separate from the personal Gallery.

### Supported Content

- Certifications
- Hackathons
- Awards
- Competitions
- Technical milestones
- Recognitions

### Item Structure

```text
Title
Organization / Issuer
Date
Short Context
Credential / Verification Link
```

---

# 17. Personal Gallery Requirements

## 17.1 Purpose

The Gallery represents the **personal side of Kaushal**, not his technical project portfolio.

It should help visitors understand the person behind the technical work.

## 17.2 Appropriate Content

Examples:

- Hackathon memories
- College/campus moments
- Events
- Travel
- Books and reading
- Learning moments
- Hobbies
- Team/community moments
- Personal achievements
- Meaningful photographs

## 17.3 Gallery Item

Each item should contain:

```text
Image
Caption
Optional category/date
```

Example:

```text
[Image]

Mumbai Hacks 2025
A memorable experience building and collaborating during the hackathon.
```

## 17.4 Gallery UI

- Responsive image grid.
- Consistent spacing.
- Captions displayed beneath images.
- Optional subtle hover effects.
- Optional lightbox in a later phase.

## 17.5 Gallery Performance

- Compress images.
- Prefer modern image formats where practical.
- Lazy-load below-the-fold images.
- Reserve image dimensions/aspect ratio to reduce layout shift.

## 17.6 Gallery Accessibility

- Meaningful `alt` text for every image.
- Captions should remain readable.
- Lightbox, if implemented, must support keyboard navigation.

## 17.7 Privacy

Only public-appropriate photographs and information may be displayed.

Do not publish private information or photographs of other people without appropriate permission.

---

# 18. Terminal Requirements

## 18.1 Purpose

The terminal is the portfolio's signature interaction.

It must behave like a controlled, simulated Debian/Linux shell while remaining entirely inside the webpage.

## 18.2 Visual Requirements

- Dark terminal interface.
- Monospace typography.
- Debian-inspired prompt.
- Terminal header/window controls.
- Scrollable output.
- Blinking cursor.
- Clear input area.
- Responsive layout.

### Example

```text
kaushal@debian:~$ help

Available commands:

about
skills
projects
experience
education
achievements
gallery
resume
contact
github
whoami
ls
history
clear
ask
ai
```

---

# 19. Terminal Command Specification

| Command | Purpose | Output Location |
|---|---|---|
| `help` | Show available commands | Terminal |
| `whoami` | Show profile summary | Terminal |
| `about` | Show About information | Terminal |
| `skills` | Show skills | Terminal |
| `projects` | Show project list | Terminal |
| `experience` | Show experience | Terminal |
| `education` | Show education | Terminal |
| `achievements` | Show achievements/certifications | Terminal |
| `gallery` | List personal gallery items | Terminal |
| `gallery <n>` | Display selected gallery item + caption | Terminal |
| `resume` | Open/download resume | Terminal + browser action |
| `contact` | Show contact links | Terminal |
| `github` | Open GitHub profile | Terminal + browser action |
| `ls` | Show available portfolio resources | Terminal |
| `history` | Show previous commands | Terminal |
| `clear` | Clear terminal output | Terminal |
| `ask <question>` | Ask portfolio-aware AI | Terminal |
| `ai` | Enter AI interaction mode | Terminal |

### Important Rule

**Terminal command output must appear inside the terminal output area.**

Exceptions are only actions that inherently require the browser, such as:

- Opening GitHub.
- Opening/downloading the resume.
- Opening an external link.

Even in those cases, the terminal should display feedback such as:

```text
kaushal@debian:~$ resume

Opening Kaushal_Kalas_Resume.pdf...
✓ Resume opened successfully.
```

---

# 20. Gallery Terminal Behavior

The `gallery` command must not replace the visual Gallery section.

## `gallery`

Output a terminal-friendly list:

```text
kaushal@debian:~$ gallery

Personal Gallery
────────────────────────────
[1] Mumbai Hacks 2025
    Hackathon experience with the team

[2] College Event
    A memorable campus moment

[3] Reading
    One of my reading moments

Type `gallery <number>` to view an image.
```

## `gallery 1`

The terminal should display the selected image inside its output area together with its caption.

```text
kaushal@debian:~$ gallery 1

Mumbai Hacks 2025

┌─────────────────────────┐
│                         │
│       [ IMAGE ]         │
│                         │
└─────────────────────────┘

A memorable experience building and collaborating
during the hackathon.
```

This provides a genuine terminal interaction while keeping the normal Gallery section visually rich.

---

# 21. Terminal Interaction Requirements

## Command History

- `↑` = previous command.
- `↓` = next command.

## `clear`

Removes visible terminal output.

## Unknown Commands

Example:

```text
kaushal@debian:~$ xyz

bash: xyz: command not found
Type 'help' to see available commands.
```

## Output Animation

Typing/output animation may be used selectively.

Do not introduce artificial delays that frustrate users.

## Optional Features

Potential Phase 2 features:

- Tab autocomplete.
- Command suggestions.
- Aliases.
- Improved command history.
- Terminal themes.

---

# 22. AI-in-Terminal Requirements

## 22.1 Principle

The AI is part of the terminal, not a separate chatbot component.

## 22.2 Primary Command

```bash
kaushal@debian:~$ ask What projects has Kaushal built?
```

## 22.3 Interactive Mode

```bash
kaushal@debian:~$ ai

> What is Kaushal currently learning?
```

## 22.4 AI Responsibilities

The AI should answer questions primarily about:

- Profile
- Skills
- Projects
- Education
- Experience
- Achievements
- Personal interests
- Contact information

## 22.5 Grounding

AI responses should be grounded in portfolio data.

The AI must not:

- Invent experience.
- Invent projects.
- Invent qualifications.
- Reveal private information.
- Pretend to know information not present in the portfolio.

### Unknown Information Response

```text
I don't have reliable information about that in Kaushal's portfolio.
```

---

# 23. AI Data Architecture

Portfolio content should ideally come from a shared structured data source.

Example:

```text
/data/portfolio.json
```

Possible structure:

```json
{
  "profile": {},
  "skills": {},
  "projects": [],
  "education": [],
  "experience": [],
  "achievements": [],
  "gallery": [],
  "contact": {}
}
```

The following components should use the same source where practical:

- Portfolio sections.
- Terminal commands.
- AI context.

This avoids duplicated content and inconsistent information.

---

# 24. AI Security Requirements

Because GitHub Pages is static hosting:

- Never expose secret API keys in client-side JavaScript.
- Never commit credentials to Git.
- Prefer official provider-managed client-safe integrations.
- Do not send unnecessary personal information to external AI systems.
- If a server-side secret/proxy is required, treat that as a future architecture rather than an MVP requirement.

### Architecture Constraint

The following is **not allowed** in production:

```javascript
const API_KEY = "secret-key";
```

inside public frontend code.

---

# 25. Resume Requirements

## Normal UI

Provide:

```text
View Resume
Download Resume
```

## Terminal

```bash
kaushal@debian:~$ resume
```

## Requirements

- PDF format.
- Predictable file path.
- Clear filename.
- Easy replacement.
- Optional last-updated date.
- Graceful failure if the file is unavailable.

---

# 26. Contact Requirements

Possible contact channels:

```text
Email
GitHub
LinkedIn
X
```

The MVP does not require a custom contact form.

A form can be introduced later through a third-party form service or backend.

---

# 27. Footer Requirements

The footer should contain:

```text
© 2026 Kaushal Kalas
GitHub · LinkedIn · Email
```

Optional:

```text
Built with HTML, CSS & JavaScript
Back to top
```

Keep the footer visually lightweight.

---

# 28. Visual Design Requirements

## Overall Design Direction

The site should feel:

- Minimal
- Professional
- Technical
- Personal
- Fast
- Memorable

The entire website should **not** look like a terminal.

The terminal is the signature interaction; the rest of the site should use a clean modern portfolio design.

## Typography

- Sans-serif for primary content.
- Monospace font for the terminal.

## Layout Principles

- Generous whitespace.
- Readable line lengths.
- Strong section hierarchy.
- Consistent spacing.
- Restrained shadows and borders.
- Strong visual hierarchy.

---

# 29. Theme Requirements

## MVP

Use a dark, developer-oriented visual system.

## Future

Optional:

- Light mode.
- Dark/light toggle.
- Additional terminal-inspired themes.

Avoid excessive theme customization.

---

# 30. Motion & Animation System

## 30.1 Animation Technology

GSAP is the approved animation library for the portfolio.

Recommended:

```text
GSAP Core
└── ScrollTrigger (when scroll-based animation is required)
```

GSAP should enhance the existing HTML/CSS/JavaScript implementation without turning the website into an animation showcase.

## 30.2 Animation Principles

Animations must be:

- Purposeful
- Subtle
- Fast
- Consistent
- Responsive
- Performance-conscious
- Accessible

## 30.3 Hero Animations

Potential animations:

- Profile image entrance
- Name/title reveal
- Description reveal
- CTA stagger
- Subtle image movement where appropriate

The Hero must become usable quickly and must not force a long intro animation.

## 30.4 Terminal Animations

Potential animations:

- Terminal window entrance
- Boot/initialization sequence
- Command-output reveal
- Prompt/cursor transitions
- Gallery image reveal
- AI response reveal
- Smooth terminal state transitions

Animation must never delay command input unnecessarily.

## 30.5 Scroll Animations

GSAP ScrollTrigger may be used for:

- Section reveals
- Project-card stagger
- Gallery-image reveal
- Achievement/timeline reveal
- Subtle section-state transitions

ScrollTrigger must not hijack page scrolling.

## 30.6 Interactive Animations

Potential interactions:

- Button hover
- Card hover
- Gallery hover
- Image transitions
- Mobile menu open/close
- Terminal state changes

Use CSS instead of GSAP for trivial hover states where GSAP provides no meaningful benefit.

## 30.7 Animation Constraints

Do not use:

- Constant floating elements
- Excessive parallax
- Scroll hijacking
- Long intro sequences
- Large text flying across the page
- Continuous background motion
- Heavy 3D effects everywhere
- Multiple animation libraries

## 30.8 Reduced Motion

Respect:

```css
@media (prefers-reduced-motion: reduce) {
  /* disable or simplify non-essential motion */
}
```

When reduced motion is enabled:

- Remove non-essential entrance animations.
- Reduce large transforms.
- Remove unnecessary stagger delays.
- Keep all functional interactions available.

## 30.9 Performance

GSAP animation must:

- Prefer transform/opacity animation.
- Avoid unnecessary layout-triggering properties.
- Avoid excessive simultaneous timelines.
- Avoid animating large numbers of off-screen elements.
- Clean up ScrollTrigger instances when required.
- Remain smooth on mid-range mobile devices.

---


