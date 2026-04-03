# React Kiosk Keyboard

[**Live Demo**](https://kiosk-keyboard-demo.vercel.app/)

A React virtual keyboard component for touch screen applications. Built with TypeScript, Tailwind CSS, and React Context. Designed for kiosk and embedded systems applications.

## Installation

```bash
npm install @lorenzoceglia/react-kiosk-keyboard
# or
pnpm add @lorenzoceglia/react-kiosk-keyboard
# or
yarn add @lorenzoceglia/react-kiosk-keyboard
```

## Quick Start

```tsx
import React, { useState } from "react";
import {
  KeyboardProvider,
  Keyboard,
  useKeyboard,
} from "@lorenzoceglia/react-kiosk-keyboard";

function MyForm() {
  const { register } = useKeyboard();

  return (
    <div>
      <input
        type="text"
        placeholder="Click to open keyboard"
        {...register("input1", () => {
          console.log("Submit from input1");
        })}
      />
    </div>
  );
}

export default function App() {
  return (
    <KeyboardProvider>
      <div className="p-8">
        <h1>Kiosk Application</h1>
        <MyForm />

        {/* Keyboard must be declared only once at the bottom of the page */}
        <Keyboard />
      </div>
    </KeyboardProvider>
  );
}
```

## How It Works

1. **Wrap with KeyboardProvider** - Manages keyboard state and input registration
2. **Register inputs** - Use the `register` method to connect inputs/textareas to the keyboard
3. **Declare Keyboard once** - Place the `<Keyboard />` component at the bottom of your page
4. The keyboard **appears automatically** when a registered input is focused
5. The keyboard **hides** when the input loses focus or is manually closed

## Exported API

### Components

#### `<Keyboard />`

The main virtual keyboard component. Renders hidden by default and appears when a registered input is focused.

**Props:**

```tsx
<Keyboard theme={customTheme} layout="qwerty" />
```

- `theme?` `KeyboardTheme` - Custom theme object (optional)
- `layout?` `KeyboardLayout` - Keyboard layout: `"qwerty"`, `"qwertz"`, `"azerty"`, `"dvorak"`, `"italian"`, `"spanish"`, `"russian"`, `"japanese"`, `"chinese"` (optional, defaults to `"qwerty"`)

**Important:** The Keyboard component should be declared **only once** at the bottom of your page, outside of your form components.

### Providers

#### `<KeyboardProvider>`

Context provider that manages all keyboard state and functionality. Must wrap your entire application.

```tsx
import { KeyboardProvider } from "@lorenzoceglia/react-kiosk-keyboard";

export default function App() {
  return (
    <KeyboardProvider>
      <YourApp />
      <Keyboard />
    </KeyboardProvider>
  );
}
```

### Hooks

#### `useKeyboard()`

Access keyboard functionality to register inputs and manage keyboard state.

**Returns:**

```tsx
{
  isVisible: boolean;                    // Whether keyboard is visible
  activeInputId: string | null;          // Currently active input ID
  register: (id, onSubmit?) => {...};   // Register an input/textarea
  getValue: (id) => string;               // Get input value by ID
  setValue: (id, value) => void;         // Set input value by ID
  setValueForActive: (value) => void;    // Set value for active input
  openKeyboard: (inputId) => void;       // Manually open keyboard
  closeKeyboard: () => void;              // Manually close keyboard
  getOnSubmit: (id) => (() => void) | undefined;
}
```

**`register()` Method:**

The `register` method connects an input or textarea to the keyboard. Spread its return value into your input element.

```tsx
const { register } = useKeyboard();

<input
  {...register("input_id", () => {
    console.log("Optional submit callback");
  })}
/>;
```

Returns an object with:

- `name` - Input name
- `value` - Current input value
- `ref` - React ref for the input element
- `onFocus` - Opens the keyboard when focused
- `onChange` - Updates the keyboard state

**Example with multiple inputs:**

```tsx
function MyForm() {
  const { register, getValue, setValue } = useKeyboard();

  return (
    <div className="space-y-4">
      <div>
        <label>Name</label>
        <input
          type="text"
          {...register("name", () => console.log("Name submitted"))}
          placeholder="Tap to enter name"
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="text"
          {...register("email")}
          placeholder="Tap to enter email"
        />
      </div>

      <div>
        <label>Message</label>
        <textarea
          {...register("message", () => console.log("Message submitted"))}
          placeholder="Tap to enter message"
        />
      </div>
    </div>
  );
}
```

### Types

Import TypeScript types for full type safety:

```tsx
import type {
  KeyboardTheme,
  KeyboardLayout,
} from "@lorenzoceglia/react-kiosk-keyboard";
```

**Available Types:**

- `KeyboardTheme` - Theme configuration object with colors
- `KeyboardLayout` - Keyboard layout type: `"qwerty" | "qwertz" | "azerty" | "dvorak" | "italian" | "spanish" | "russian" | "japanese" | "chinese"`
- `ThemeColor` - Color palette for themes
- `KeyboardContextType` - Type for keyboard context

### Themes

You can use **pre-built themes** or **create custom themes**.

#### Using Pre-built Themes

Import and use themes already included in the library:

```tsx
import { Keyboard, PRESET_THEMES } from "@lorenzoceglia/react-kiosk-keyboard";

// Access pre-built themes
const darkTheme = PRESET_THEMES.find((t) => t.id === "midnight");
const oceanTheme = PRESET_THEMES.find((t) => t.id === "ocean");

export default function App() {
  return (
    <KeyboardProvider>
      <YourApp />
      <Keyboard theme={darkTheme} />
    </KeyboardProvider>
  );
}
```

**Available pre-built themes (via PRESET_THEMES):**

- `default` - Light theme with neutral colors
- `midnight` - Dark theme with indigo accents
- `sunset` - Warm orange and amber colors
- `ocean` - Cool blue wave theme
- `forest` - Emerald green theme
- `lavender` - Purple mist theme
- `citrus` - Bright yellow and orange
- `rosewood` - Pink and rose tones
- `iceberg` - Cool blue theme
- `candy` - Pink candy floss theme
- `autumn` - Warm brown and gold
- `cosmos` - Deep purple theme

#### Creating Custom Themes

Create your own theme object by following the `KeyboardTheme` type:

```tsx
import type { KeyboardTheme } from "@lorenzoceglia/react-kiosk-keyboard";

const customTheme: KeyboardTheme = {
  id: "custom",
  name: "Custom Theme",
  colors: {
    primary: "#3b82f6",
    secondary: "#06b6d4",
    accent: "#1e40af",
    background: "#ffffff",
    foreground: "#000000",
    text: "#1f2937",
    destructive: "#ef4444",
  },
};

<Keyboard theme={customTheme} />;
```

You can organize your themes in a separate file:

```tsx
// themes.ts
import type { KeyboardTheme } from "@lorenzoceglia/react-kiosk-keyboard";

export const myDarkTheme: KeyboardTheme = {
  id: "my-dark",
  name: "My Dark Theme",
  colors: {
    primary: "#1f2937",
    secondary: "#374151",
    accent: "#60a5fa",
    background: "#111827",
    foreground: "#f3f4f6",
    text: "#f3f4f6",
    destructive: "#ef4444",
  },
};

export const myLightTheme: KeyboardTheme = {
  id: "my-light",
  name: "My Light Theme",
  colors: {
    primary: "#e5e7eb",
    secondary: "#d1d5db",
    accent: "#3b82f6",
    background: "#ffffff",
    foreground: "#000000",
    text: "#1f2937",
    destructive: "#dc2626",
  },
};
```

Then import and use:

```tsx
import { myDarkTheme, myLightTheme } from "./themes";

<Keyboard theme={myDarkTheme} />;
```

### Keyboard Layouts

You can use **pre-built keyboard layouts** or **create your own custom layouts**.

#### Using Pre-built Layouts

The library comes with multiple keyboard layouts already built and exported. Import them directly:

```tsx
import { Keyboard, KEYBOARD_LAYOUTS } from "@lorenzoceglia/react-kiosk-keyboard";

// KEYBOARD_LAYOUTS contains all pre-built layouts
<Keyboard layout="qwerty" />
<Keyboard layout="qwertz" />
<Keyboard layout="azerty" />
<Keyboard layout="dvorak" />
<Keyboard layout="italian" />
<Keyboard layout="spanish" />
<Keyboard layout="russian" />
<Keyboard layout="japanese" />
<Keyboard layout="chinese" />
```

**Available pre-built layouts (in KEYBOARD_LAYOUTS):**

- `qwerty` - Standard QWERTY English layout
- `qwertz` - German/Central European layout
- `azerty` - French layout
- `dvorak` - Dvorak layout
- `italian` - Italian layout
- `spanish` - Spanish layout
- `russian` - Russian Cyrillic layout
- `japanese` - Japanese hiragana layout
- `chinese` - Simplified Chinese layout

Each layout includes:

- **main** - The primary key layout
- **special** - Special symbols and characters
- **emoji** - Emoji keyboard view

#### Creating Custom Layouts

You can create custom keyboard layouts by defining your own layout structure:

```tsx
import {
  Keyboard,
  KEYBOARD_LAYOUTS,
} from "@lorenzoceglia/react-kiosk-keyboard";

// Define your custom layout configuration
const customLayout = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["SHIFT", "Z", "X", "C", "V", "B", "N", "M", "DELETE"],
  ["SPECIAL", "SPACE", "ENTER"],
];

// Add to your KEYBOARD_LAYOUTS or create a custom config
export const customKeyboardConfig = {
  main: customLayout,
  special: [["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"], ["BACK"]],
  emoji: [["😀", "😂", "🤣", "😊", "😉"], ["BACK"]],
};

<Keyboard layout="qwerty" />;
```

Or extend the keyboard component to support custom layout registration.

### Styles

CSS is automatically included when you import the Keyboard component:

```tsx
import { Keyboard } from "@lorenzoceglia/react-kiosk-keyboard";
// Styles are automatically applied ✓
```

Or manually import if needed:

```tsx
import "@lorenzoceglia/react-kiosk-keyboard/style.css";
```

## Complete Example

```tsx
import React from "react";
import {
  KeyboardProvider,
  Keyboard,
  useKeyboard,
} from "@lorenzoceglia/react-kiosk-keyboard";
import type { KeyboardTheme } from "@lorenzoceglia/react-kiosk-keyboard";

const customTheme: KeyboardTheme = {
  id: "dark",
  name: "Dark Theme",
  colors: {
    primary: "#1f2937",
    secondary: "#374151",
    accent: "#60a5fa",
    background: "#111827",
    foreground: "#f3f4f6",
    text: "#f3f4f6",
    destructive: "#ef4444",
  },
};

function Form() {
  const { register } = useKeyboard();

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Username</label>
        <input
          type="text"
          {...register("username")}
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter username"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter password"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Bio</label>
        <textarea
          {...register("bio")}
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter bio"
          rows={4}
        />
      </div>
    </form>
  );
}

export default function App() {
  return (
    <KeyboardProvider>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Kiosk Login</h1>
          <Form />
        </div>

        {/* Declare keyboard once at the bottom */}
        <Keyboard theme={customTheme} layout="qwerty" />
      </div>
    </KeyboardProvider>
  );
}
```

## Features

- ✅ Touch-optimized virtual keyboard
- ✅ Multiple keyboard layouts (QWERTY, QWERTZ, AZERTY, Dvorak, and more)
- ✅ Shift and Caps Lock support
- ✅ Special keys (Enter, Delete, Backspace)
- ✅ Customizable themes with color palettes
- ✅ Full TypeScript support with type definitions
- ✅ React Context API for state management
- ✅ Auto-hide when input loses focus
- ✅ Support for inputs and textareas
- ✅ Long-press key detection
- ✅ Responsive button sizing
- ✅ Tailwind CSS compatible

## Requirements

- React 16.8.0 or higher
- React DOM 16.8.0 or higher

## Requirements

- React 16.8.0 or higher
- React DOM 16.8.0 or higher
- Tailwind CSS 3.0 or higher

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers with touch support

## License

MIT © [Lorenzo Ceglia](https://github.com/lorenzoceglia)

## Repository

[GitHub: react-kiosk-keyboard](https://github.com/lorenzoceglia/react-kiosk-keyboard)
