Sure! Here's a copy-paste ready README file content for your refined `CONTRIBUTING.md` in Snippify:

---

```markdown
# Contributing to Snippify

Hey there! 👋 First off, thanks for taking the time to contribute to Snippify! ❤️

You can contribute in two main ways:

- **Improving the code** (like fixing bugs or adding cool new features)
- **Adding new code snippets** (or improving the existing ones!)

---

## Improving the code

### How to report bugs

If you spot a bug in the codebase or issues with the documentation, please open up a [GitHub issue](https://github.com/sampathvenur/Snippify/issues) detailing the problem before creating a PR. Once confirmed with maintainers, you can then create a PR.

### How to propose new features

If you are interested in proposing new features, please open up a new [GitHub discussion](https://github.com/sampathvenur/Snippify/discussions) with details for the proposed feature.

Please do not create a PR for a new feature without first discussing it with the maintainers. If you create a PR for a new feature without discussing it first, then your PR will be closed.

---

## Snippets Guidelines

### Snippet Format

All snippets should follow the following structure:

- A JSON file with the following fields:
  - `title`: A descriptive name for the snippet
  - `description`: A brief explanation of what the snippet does
  - `author`: Your GitHub username
  - `code`: The actual code snippet, with proper formatting

Example:

```json
{
  "title": "Convert Number to Currency",
  "description": "Converts a number to a currency format with a specific locale.",
  "author": "sampathvenur",
  "code": "function formatCurrency(amount, locale = 'en-US', currency = 'USD') {\n  return new Intl.NumberFormat(locale, {\n    style: 'currency',\n    currency: currency\n  }).format(amount);\n}\n\n// Usage:\nconsole.log(formatCurrency(1234.56)); // Output: $1,234.56"
}
```

### Code Style Guidelines

1. **Keep it simple and focused**
2. **Include usage examples**
3. **Use proper formatting** (`\n` for newlines)
4. **Avoid dependencies**
5. **Add comments for clarity**

### Snippet boundaries

Before submitting, ask:

- Is this already easily available in the standard library?
- Is this snippet practically useful?
- Can it be simplified or modularized?

If “yes” to #1 or “no” to #2 — likely to be rejected.

---

## Adding Snippets

### Adding a New Snippet

1. **Go to `/src/snippets`**
2. **Choose a language folder** (e.g., `javascript`)
3. **Pick a category** or create one (see below)
4. **Create a `.json` file** in kebab-case (e.g., `format-date.json`)
5. **Structure your snippet like this**:

```json
{
  "title": "Format Date",
  "description": "Formats a date in 'YYYY-MM-DD' format.",
  "author": "sampathvenur",
  "code": "const formatDate = (date) => date.toISOString().split(\"T\")[0];\n\n// Usage:\nconsole.log(formatDate(new Date())); // Output: '2024-12-10'"
}
```

6. **Test the snippet** by running:

```bash
npm run dev
```

Expected structure:

```
/src/snippets
|- javascript
   |- date-time
      |- format-date.json
```

### Editing an Existing Snippet

1. Find the `.json` file
2. Modify it
3. Mention your changes in the PR description

### Adding a New Category

1. Inside a language folder, add a new folder (e.g., `file-handling`)
2. Add snippets like normal inside that folder

Example:

```
/src/snippets
|- python
   |- file-handling
   |- list-manipulation
```

### Adding a New Language

1. **Create a folder** under `/src/snippets` (e.g., `go`)
2. **Add `icon.svg`** (50x50px)
3. **Update sidebar iconMap in `sidebar.tsx`**:

```ts
const iconMap: Record<string, string> = {
  // existing
  yourLanguage: yourLanguageIcon,
};
```

4. **Update syntax highlighting in `SnippetModal.tsx`**:

```ts
const languageMap: Record<string, string> = {
  yourLanguage: 'language-yourLanguage',
};
```

5. **Create at least one category and snippet**

Example:

```
/src/snippets
|- go
   |- icon.svg
   |- basics
      |- hello-world.json
```

---

## Testing Your Contributions

1. Run the dev server:

```bash
npm run dev
```

2. Check:
   - Snippet appears under the correct category
   - Syntax highlighting works
   - Copy button functions

---

## Final Notes

Whether you're fixing a typo, writing a new snippet, or cooking up the next big feature — thank you! 🛠️

Questions? Start a [GitHub discussion](https://github.com/sampathvenur/Snippify/discussions).

Happy coding! 💻✨
```

--- 

You're good to go. Let me know if you want this saved as a file or formatted differently.