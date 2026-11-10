---
name: "Detection Anomaly RBAC Prototype"
description: "The Kiki desktop control room for evaluating local-only, role-aware anomaly monitoring workflows."
colors:
  background: "#000000"
  panel: "#0a0c11"
  panel-raised: "#12161e"
  panel-strong: "#171c25"
  field: "#05070a"
  border: "#1a1f2a"
  border-strong: "#2a3140"
  text: "#e8ecf4"
  text-muted: "#98a3b6"
  text-subtle: "#707c90"
  accent: "#82a8ea"
  primary: "#2c58ad"
  primary-hover: "#3866c4"
  success: "#56ba8f"
  warning: "#d6a54a"
  danger: "#e06c78"
  info: "#6f9be8"
typography:
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title-compact:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.5
  label-compact:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "10px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  tag: "4px"
  control: "8px"
  surface: "9px"
  pill: "999px"
spacing:
  compact: "8px"
  grid: "12px"
  surface: "16px"
  page-y: "24px"
  page-x: "28px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "7px 13px"
    height: "36px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "#ffffff"
    rounded: "{rounded.control}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "7px 13px"
    height: "36px"
  button-danger:
    backgroundColor: "transparent"
    textColor: "{colors.danger}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "7px 13px"
    height: "36px"
  field:
    backgroundColor: "{colors.field}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "8px 10px"
  nav-item:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "8px 11px"
    height: "40px"
  nav-item-active:
    backgroundColor: "{colors.panel-raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
  status-chip:
    backgroundColor: "transparent"
    textColor: "{colors.success}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
  card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.surface}"
    padding: "16px"
---

# Design System: Detection Anomaly RBAC Prototype

## Overview

**Creative North Star: "The Kiki Control Room"**

The Kiki Control Room is a factual continuation of the established Kiki desktop monitoring world: black and deep navy surfaces, cool one-pixel boundaries, compact outlined controls, and tightly ordered operational information. It should feel like a working console whose visual hierarchy serves scanning, intervention, and verification—not a generic SaaS administration template.

This is a local-only RBAC prototype. Its interface must make simulated state, pending decisions, and permission boundaries legible at the point of work while preserving the density of camera monitoring, reports, settings, logs, and diagnostics. Blue is restrained to navigation, focus, and primary actions; green, amber, and red communicate operational meaning without turning the screen decorative.

The system is desktop-first by contract. Below the desktop gate, the shell and dashboard do not render; a plain explanatory notice replaces them. Inside the gate, hierarchy comes from tonal layering, precise borders, disciplined spacing, and semantic state—not oversized display type, decorative gradients, or ornamental effects.

**Key Characteristics:**

- Dense, ordered operational information with persistent navigation.
- Black/navy tonal layers separated by cool one-pixel borders.
- Restrained blue action and focus language with semantic green, amber, and red states.
- Compact 8–10px corner language, outlined icons, and local permission context.
- Explicit prototype boundaries and desktop-only behavior.

## Colors

The palette is a near-black operational stack with cool blue hierarchy and quiet semantic status colors.

### Primary

- **Control Blue** (`primary`): Reserved for the highest-priority action, selected segmented control, active switch, and brand mark.
- **Control Blue Hover** (`primary-hover`): The primary action's deliberate hover response.
- **Signal Blue** (`accent`): Focus outlines, active navigation indicators, links, and lightweight role emphasis.

### Neutral

- **Black Canvas** (`background`): The application ground and camera-frame base.
- **Console Panel** (`panel`): Sidebar, cards, session bar, and dialog surfaces.
- **Raised Navy** (`panel-raised`): Hover, selection, identity, and nested operational surfaces.
- **Strong Navy** (`panel-strong`): The strongest available panel step for deeper tonal separation.
- **Input Well** (`field`): Recessed fields, searches, and method selectors.
- **Cool Divider** (`border`): Default card, row, and shell boundaries.
- **Strong Divider** (`border-strong`): Interactive outlines and stronger separation.
- **Console Text** (`text`): Primary labels and values.
- **Muted Copy** (`text-muted`): Supporting explanations and secondary metadata.
- **Subtle Copy** (`text-subtle`): Lowest-emphasis hints that remain readable.

### Semantic Status

- **Operational Green** (`success`): Running, allowed, and confirmed local state.
- **Decision Amber** (`warning`): Prototype notices, pending access, and caution.
- **Restriction Red** (`danger`): Denied, failed, destructive, and error states.
- **Telemetry Blue** (`info`): Informational data marks and charts, distinct from the primary action.

### Named Rules

**The One Blue Action Rule.** Use Control Blue for the clearest next action or selected state; do not flood dense screens with competing blue fills.

**The Semantic State Rule.** Green means operational or allowed, amber means caution or pending, and red means denied, failed, or destructive. Never use these colors as decoration.

## Typography

**Display Font:** Inter (with ui-sans-serif and system fallbacks)

**Body Font:** Inter (with ui-sans-serif and system fallbacks)

**Label/Mono Font:** Inter for labels; ui-monospace, SFMono-Regular, and Menlo for key hints and log-level data.

**Character:** A single compact sans-serif stack keeps the console direct and highly scannable. Tight heading tracking establishes hierarchy without introducing a separate expressive typeface.

### Hierarchy

- **Headline** (700, `headline`, 1.2): Page titles; keep them short and factual.
- **Title** (700, `title`, 1.2): Card and section headings.
- **Compact Title** (700, `title-compact`, 1.2): Dense subsection and row titles.
- **Body** (400, `body`, 1.5): Default interface copy, data context, and control labels.
- **Label** (500, `label`, 1.5): Field labels, metadata, and secondary controls.
- **Compact Label** (600, `label-compact`, 1.2): Uppercase prototype, table, and status microcopy with restrained tracking.

### Named Rules

**The Operational Scale Rule.** Use compact hierarchy and weight before increasing size; giant text is outside the Kiki console language.

## Layout

The authenticated application is a fixed desktop shell: a persistent 244px sidebar beside a flexible content column, with a 38px session bar above the scrollable page. Standard pages use 24px top, 28px horizontal, and 44px bottom padding. A narrow page may cap itself at 1180px, while operational views use the available width.

The base rhythm is compact: 8px between controls, 12px between grid surfaces, and 16px inside cards. Camera monitoring uses a two-column tile grid. Dashboard summaries use four columns at full width, collapsing to two columns at the observed 1300px compact breakpoint; permission grids make the same three-to-two adjustment.

The hard desktop gate is 1100px. Below it, do not squeeze, stack, or transform the application shell into a mobile dashboard; render the dedicated desktop-only notice instead.

**The Desktop Contract Rule.** The 1100px gate is a product constraint, not a responsive suggestion: no application shell or dashboard exists below it.

## Elevation & Depth

Depth is primarily structural: near-black tonal steps and cool one-pixel borders separate the canvas, panels, nested surfaces, and controls. The established ambient shadow is reserved for overlays and transient feedback; cards remain flat at rest.

### Shadow Vocabulary

- **Overlay Ambient** (`shadow`): A broad, dark shadow for confirmation dialogs and toasts only.
- **Accent Focus Halo:** A three-pixel translucent Signal Blue ring used by focused fields, paired with the global two-pixel focus-visible outline for keyboard interaction.

### Named Rules

**The Flat Console Rule.** Keep operational cards border-defined and flat; apply ambient shadow only when a surface must float above the working plane.

## Shapes

The form language is compact and gently squared. Cards use the shared surface radius; most controls, navigation rows, and notices use an 8px corner. Small type and severity tags use 4px corners, while status and permission chips may use a full pill only because they communicate bounded state. Borders are cool, one pixel, and materially more important than shadow.

**The Bounded State Rule.** Reserve pill geometry for status, role, and permission labels; ordinary actions and containers remain compact rounded rectangles.

## Components

### Buttons

- **Shape:** Compact rounded rectangle, normally 36px high with `button-primary` or `button-secondary` spacing.
- **Primary:** Filled Control Blue with white text; one clear primary action per local decision area.
- **Hover / Focus:** Shift to Control Blue Hover on hover; retain the global Signal Blue two-pixel keyboard outline. State transitions use the established 160ms ease-out response.
- **Secondary:** Transparent with a Strong Divider outline; hover adds a Raised Navy fill and Signal Blue border.
- **Danger:** Transparent Restriction Red text and border; hover adds only a restrained red tint.

### Chips

- **Style:** Compact text, one-pixel semantic outline, and minimal tint only when state benefits from it.
- **State:** Running and allowed use Operational Green; pending uses Decision Amber; failed and denied use Restriction Red. Roles use Signal Blue.
- **Placement:** Show permission state beside the affected field group, action, route content, or administrative section—not in a detached legend.

### Cards / Containers

- **Corner Style:** Shared surface radius (`card`).
- **Background:** Console Panel over the Black Canvas; nested and hover surfaces use Raised Navy.
- **Shadow Strategy:** Flat at rest; see the Flat Console Rule.
- **Border:** One-pixel Cool Divider, strengthened only for interaction or elevated overlays.
- **Internal Padding:** Standard 16px surface rhythm, with 12–16px compact variations for data-dense cards.

### Inputs / Fields

- **Style:** Recessed Input Well, Strong Divider border, compact control radius, and `field` padding.
- **Focus:** Signal Blue border plus a translucent three-pixel halo; never remove keyboard-visible focus.
- **Error / Disabled:** Error copy uses Restriction Red. Disabled controls retain their structure at reduced opacity and must not imply permission.

### Navigation

Navigation is a persistent 244px left rail with compact outline icons and 40px rows. Default items use Muted Copy; hover and active states move to Raised Navy and Console Text. The active item adds a one-pixel Signal Blue rail and accent-colored icon. Permission-filtered visibility belongs here, but direct routes remain independently guarded.

### Permission States

Permission presentation is local and explicit. Allowed, denied, pending, and read-only states appear next to the work they constrain, and high-impact actions remain distinct from ordinary editing. Pending always renders as unavailable, never as provisional access.

## Do's and Don'ts

### Do:

- **Do** preserve the established Kiki black/navy operational console and its persistent desktop shell.
- **Do** use cool one-pixel borders and tonal layering to order dense information.
- **Do** keep blue primary actions restrained and semantic green, amber, and red consistent.
- **Do** place permission and local-only prototype state at the point of work.
- **Do** use compact outlined icons, tabular numerals for operational data, and visible keyboard focus.

### Don't:

- **Don't** turn the interface into a generic SaaS admin template.
- **Don't** introduce decorative gradients, ornamental glow, or shadows on resting cards.
- **Don't** use giant display text where compact hierarchy will do.
- **Don't** convert ordinary actions or containers into excessive pills.
- **Don't** render, squeeze, or stack the application shell below the 1100px desktop gate.
- **Don't** imply that hidden or disabled controls provide production authorization.
