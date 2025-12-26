# NN/G on File UX

Nielsen Norman Group don’t prescribe a single “magic” view for every situation, because the best way to present a collection of files depends on the tasks users perform. In their research they compare cards, lists and tables and give guidance on when to use each pattern, together with advice on handling PDFs and external links. Below is a summary of the approaches most often recommended by NN/G for displaying documents, along with design tips for a retrieval‑augmented generation (RAG) tool on desktop.

### 1. Lists for general browsing and small sets of documents

- **Text lists minimise scrolling and maximise scanability**. NN/G’s mobile navigation study found that text‑only lists use less vertical space, making it easy to see many options at once; the same principle helps users quickly scan document titles and metadata on desktop.
- **Add icons and key details:** Show a file‑type icon (e.g., PDF, Word), the document title, last‑modified date and maybe a short snippet so users recognise the file without opening it. Use visual hierarchy (e.g., bold titles) so important information stands out.
- **Provide search and basic filters** so users can narrow the list to specific topics or dates.

Use a simple list when the number of documents is moderate (dozens, not hundreds) and users mainly browse rather than compare documents.

### 2. Tables for large document sets and comparison tasks

- NN/G notes that tables scale well: they can easily add rows and columns and are the best option when users need to compare multiple items. Adjacent rows/columns allow side‑by‑side comparison without forcing users to hold details in memory.
- **Support key tasks:** design the table to help users (1) find records that match specific criteria, (2) compare data, (3) view/edit individual records and (4) perform batch actions.
- **Make the first column human‑readable and order columns by importance**. Include obvious sorting, filtering and column‑hiding controls; highlight active filters and freeze header rows/columns for orientation.
- **Avoid modal dialogs for editing.** NN/G recommends non‑modal side panels that keep the table visible; modal pop‑ups obscure adjacent records and make it hard to refer to nearby data.

Use tables when your RAG system will display many documents (e.g., hundreds or thousands) and users must compare metadata or take bulk actions.

### 3. Cards/grids for highly visual content or when differentiation matters

- Card‑based or grid layouts require more eye movement and memory and are slower for comparisons, so NN/G view them as secondary to lists and tables.
- They are best for small sets of items where each item needs a visual preview (e.g., design comps, photo‑heavy documents). Use a grid on desktop to fill horizontal space and add images; use sparingly when the visual content helps users differentiate options.
- For text‑heavy documents, rely on thumbnail previews only if they meaningfully aid recognition; otherwise, lists or tables are more efficient.

### 4. Don’t embed long PDF documents as the primary view

NN/G strongly advises against forcing users to read PDFs online. PDFs are optimised for print; they break content across pages, are hard to scan and navigate, and cause long download times. Convert documents to web‑native formats (HTML/Markdown) for easy reading and highlighting, and only link to PDFs when users are likely to print them.

### 5. Handle links and external documents thoughtfully

- Avoid gratuitously opening documents in new tabs or windows. Extra windows/tabs create clutter and disorientation. Only open a document in a separate window when the user clearly needs to reference it alongside the main interface (e.g., reading a file while performing another task). Otherwise, open in the same tab and rely on navigation controls or side‑by‑side panels.
- Provide file actions inline (e.g., view, download, delete). For batch operations, include checkboxes and a persistent action bar.

### 6. Progressive disclosure and context

Regardless of the presentation, follow NN/G’s general usability heuristics:

- **Show system status** and make it obvious when a document is being loaded or processed.
- **Expose only enough information to decide** whether to open a file; reveal more metadata in tooltips or side panels.
- **Use clear labels instead of icons alone**; avoid “mystery‑meat” IDs.
- **Maintain context:** when users open a document for RAG, show it in a panel or viewer that keeps their position in the document list visible, reducing memory load and navigation steps.

### Recommendations for a desktop RAG interface

For a desktop RAG system, combine these patterns:

1. **Default to a sortable/filterable list or table** showing each document’s title, source, date and a short summary. Use a table if there are many documents or if metadata comparisons matter; otherwise, a list suffices.
2. **Provide search and facets** (e.g., date ranges, source type, tags) so users can narrow the set of retrieved documents quickly.
3. **Offer a quick preview in a side panel** when a user selects a document. This panel should show the first few lines and highlight query terms; include an “open full view” button for reading or referencing in detail.
4. **Convert PDFs and other non‑HTML files into web‑friendly previews** or extract key passages to display in your viewer. Offer the original file for download if needed.
5. **Support multi‑select and batch actions** (e.g., add to conversation, remove, download) with checkboxes and a persistent actions bar.
6. **Allow switching to a card/grid view** for images or visually distinct documents but default to list/table for efficiency.

By applying these NN/G‑informed design patterns you provide a familiar, efficient interface for selecting and reading documents while maintaining the flexibility needed for retrieval‑augmented generation.
