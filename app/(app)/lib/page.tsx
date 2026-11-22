
"use client";

import { useRef, useState, type FormEvent } from "react";

type GalleryType = "image" | "pdf" | "video";

type GalleryItem = {
  id: number;
  type: GalleryType;
  title: string;
  description: string;
  url: string;
  source: string;
  category: string;
};

const initialItems: GalleryItem[] = [
  // IMAGE GALLERY
  {
    id: 1,
    type: "image",
    title: "Programming",
    description: "Belajar pemrograman dan pengembangan perangkat lunak.",
    url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=85",
    source: "Unsplash",
    category: "Programming",
  },
  {
    id: 2,
    type: "image",
    title: "Mathematics",
    description: "Matematika sebagai dasar ilmu pengetahuan dan teknologi.",
    url: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=85",
    source: "Unsplash",
    category: "Mathematics",
  },
  {
    id: 3,
    type: "image",
    title: "Learning",
    description: "Membangun kebiasaan membaca dan belajar.",
    url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=85",
    source: "Unsplash",
    category: "Education",
  },
  {
    id: 4,
    type: "image",
    title: "Computer Science",
    description: "Mengenal perangkat keras dan teknologi komputer.",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
    source: "Unsplash",
    category: "Technology",
  },
  {
    id: 5,
    type: "image",
    title: "Science Laboratory",
    description: "Eksperimen dan penelitian ilmiah.",
    url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=85",
    source: "Unsplash",
    category: "Science",
  },
  {
    id: 6,
    type: "image",
    title: "Creative Workspace",
    description: "Ruang kerja untuk belajar dan berkarya.",
    url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    source: "Unsplash",
    category: "Productivity",
  },
  {
    id: 7,
    type: "image",
    title: "Digital Library",
    description: "Perpustakaan sebagai pusat pengetahuan.",
    url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=85",
    source: "Unsplash",
    category: "Education",
  },
  {
    id: 8,
    type: "image",
    title: "Digital Learning",
    description: "Belajar menggunakan teknologi digital.",
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
    source: "Unsplash",
    category: "Technology",
  },

  // PDF GALLERY
  {
    id: 9,
    type: "pdf",
    title: "Discrete Mathematics and Programming",
    description: "Materi matematika diskrit yang berkaitan dengan pemrograman.",
    url: "https://www3.cs.stonybrook.edu/~liu/papers/DiscreteMathProg-SIGCSE21.pdf",
    source: "Stony Brook University",
    category: "Mathematics",
  },
  {
    id: 10,
    type: "pdf",
    title: "Attention Is All You Need",
    description: "Paper penelitian tentang arsitektur Transformer.",
    url: "https://arxiv.org/pdf/1706.03762",
    source: "arXiv",
    category: "Artificial Intelligence",
  },
  {
    id: 11,
    type: "pdf",
    title: "Computer Science Resources",
    description: "Kumpulan referensi dan penelitian ilmu komputer.",
    url: "https://network.bepress.com/explore/physical-sciences-and-mathematics/?facet=discipline%3A%22Computer+Sciences%22&facet=download_type%3A%22PDF%22",
    source: "Digital Commons",
    category: "Computer Science",
  },

  // VIDEO GALLERY
  {
    id: 12,
    type: "video",
    title: "Introduction to Programming",
    description: "Pengenalan dasar pemrograman dan ilmu komputer.",
    url: "https://www.youtube.com/watch?v=zOjov-2OZ0E",
    source: "freeCodeCamp",
    category: "Programming",
  },
  {
    id: 13,
    type: "video",
    title: "Maths for Programmers",
    description: "Belajar konsep matematika yang digunakan dalam pemrograman.",
    url: "https://www.youtube.com/watch?v=2SpuBqvNjHI",
    source: "freeCodeCamp",
    category: "Mathematics",
  },
];

// Mengambil ID video dari berbagai format URL YouTube
function getYoutubeId(input: string): string | null {
  try {
    const url = new URL(input.trim());
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return url.pathname.split("/").filter(Boolean)[0] || null;
    }

    if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtube-nocookie.com"
    ) {
      if (url.pathname === "/watch") {
        return url.searchParams.get("v");
      }

      const parts = url.pathname.split("/").filter(Boolean);

      if (
        ["embed", "shorts", "live", "v"].includes(parts[0]) &&
        parts[1]
      ) {
        return parts[1];
      }
    }

    return null;
  } catch {
    return null;
  }
}

// Menghasilkan URL khusus untuk pemutar video
function getYoutubeEmbed(url: string): string | null {
  const videoId = getYoutubeId(url);

  if (!videoId) return null;

  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`;
}

// Menghasilkan thumbnail video
function getYoutubeThumbnail(url: string): string {
  const videoId = getYoutubeId(url);

  if (!videoId) return "";

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export default function SneakPeekPage() {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [activeTab, setActiveTab] = useState<GalleryType>("image");
  const [search, setSearch] = useState("");
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [formSource, setFormSource] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formFile, setFormFile] = useState<File | null>(null);
  const [formError, setFormError] = useState("");

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const filteredItems = items.filter((item) => {
    const matchesTab = item.type === activeTab;
    const keyword = search.toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword);

    return matchesTab && matchesSearch;
  });

  const counts = {
    image: items.filter((item) => item.type === "image").length,
    pdf: items.filter((item) => item.type === "pdf").length,
    video: items.filter((item) => item.type === "video").length,
  };

  function resetForm() {
    setFormTitle("");
    setFormDescription("");
    setFormUrl("");
    setFormSource("");
    setFormCategory("");
    setFormFile(null);
    setFormError("");
    setEditingItem(null);
  }

  function openAddForm() {
    resetForm();
    setShowForm(true);
  }

  function openEditForm(item: GalleryItem) {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormDescription(item.description);
    setFormUrl(item.url);
    setFormSource(item.source);
    setFormCategory(item.category);
    setFormFile(null);
    setFormError("");
    setShowForm(true);
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (!formTitle.trim()) {
      setFormError("Judul harus diisi.");
      return;
    }

    let finalUrl = formUrl.trim();

    if (activeTab === "image") {
      if (formFile) {
        finalUrl = URL.createObjectURL(formFile);
      }

      if (!finalUrl) {
        setFormError("Masukkan URL gambar atau pilih file gambar.");
        return;
      }
    }

    if (activeTab === "pdf" && !finalUrl) {
      setFormError("Masukkan URL dokumen atau PDF.");
      return;
    }

    if (activeTab === "video") {
      const videoId = getYoutubeId(finalUrl);

      if (!videoId) {
        setFormError(
          "URL YouTube tidak valid. Gunakan link youtube.com/watch, youtu.be, atau YouTube Shorts."
        );
        return;
      }
    }

    const newItem: GalleryItem = {
      id: editingItem?.id ?? Date.now(),
      type: activeTab,
      title: formTitle.trim(),
      description: formDescription.trim(),
      url: finalUrl,
      source: formSource.trim() || "Personal Collection",
      category: formCategory.trim() || "General",
    };

    if (editingItem) {
      setItems((previous) =>
        previous.map((item) =>
          item.id === editingItem.id ? newItem : item
        )
      );

      if (previewItem?.id === editingItem.id) {
        setPreviewItem(newItem);
      }
    } else {
      setItems((previous) => [newItem, ...previous]);
    }

    setShowForm(false);
    resetForm();
  }

  function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus item ini?"
    );

    if (!confirmed) return;

    setItems((previous) => previous.filter((item) => item.id !== id));

    if (previewItem?.id === id) {
      setPreviewItem(null);
    }
  }

  function openSource(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function openPreview(item: GalleryItem) {
    setPreviewItem(item);
  }

  function closePreview() {
    setPreviewItem(null);
  }

  function openFullscreen() {
    const iframe = iframeRef.current;

    if (iframe?.requestFullscreen) {
      iframe.requestFullscreen().catch(() => {
        window.alert("Fullscreen tidak tersedia pada browser ini.");
      });
    }
  }

  function renderThumbnail(item: GalleryItem) {
    if (item.type === "image") {
      return (
        <img
          src={item.url}
          alt={item.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      );
    }

    if (item.type === "video") {
      return (
        <div className="relative h-full w-full bg-black">
          <img
            src={getYoutubeThumbnail(item.url)}
            alt={item.title}
            className="h-full w-full object-cover opacity-90"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-2xl text-white shadow-xl transition group-hover:scale-110">
              ▶
            </div>
          </div>

          <span className="absolute bottom-3 right-3 rounded bg-black/80 px-2 py-1 text-xs text-white">
            VIDEO
          </span>
        </div>
      );
    }

    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 text-orange-700">
        <span className="text-6xl">📄</span>
        <span className="mt-3 text-xs font-semibold uppercase tracking-widest">
          PDF / Document
        </span>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#fafafa] text-gray-900">
      {/* NAVBAR */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="flex w-full items-center justify-between px-5 py-5 sm:px-8 lg:px-12 2xl:px-16">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-xl text-white">
              K
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">
                Knowledge Library
              </p>
              <p className="text-xs text-gray-500">Sneak Peek Collection</p>
            </div>
          </a>

          <a
            href="/"
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
          >
            ← Back to Home
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="w-full px-5 pb-12 pt-16 sm:px-8 lg:px-12 2xl:px-16">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Knowledge Preview
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Explore the World of
            <span className="block text-gray-400">Knowledge.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-500">
            Tempat untuk mengumpulkan, menjelajahi, dan berbagi berbagai
            sumber pengetahuan. Mulai dari gambar, jurnal ilmiah, hingga
            video pembelajaran.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-5">
            {[
              { label: "Images", count: counts.image, icon: "🖼️" },
              { label: "Documents", count: counts.pdf, icon: "📚" },
              { label: "Videos", count: counts.video, icon: "▶️" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6"
              >
                <div className="text-2xl">{stat.icon}</div>
                <p className="mt-2 text-2xl font-bold">{stat.count}</p>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="w-full px-5 pb-20 sm:px-8 lg:px-12 2xl:px-16">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              The Collection
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Explore Collection
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Jelajahi berbagai sumber belajar dan pengetahuan.
            </p>
          </div>

          <button
            onClick={openAddForm}
            className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            + Add New Collection
          </button>
        </div>

        {/* TABS */}
        <div className="mb-7 flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["image", "🖼️ Images", counts.image],
                ["pdf", "📚 Documents", counts.pdf],
                ["video", "▶️ Videos", counts.video],
              ] as const
            ).map(([tab, label, count]) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSearch("");
                }}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${activeTab === tab
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-100"
                  }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search collection..."
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-500 sm:w-72"
          />
        </div>

        {/* COLLECTION GRID */}
        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">
            <div className="text-4xl">🔎</div>
            <h3 className="mt-4 font-semibold">No collection found</h3>
            <p className="mt-2 text-sm text-gray-500">
              Belum ada koleksi yang sesuai dengan pencarianmu.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <button
                  onClick={() =>
                    item.type === "pdf"
                      ? openSource(item.url)
                      : openPreview(item)
                  }
                  className="relative block aspect-[4/3] w-full overflow-hidden text-left"
                  aria-label={`Open ${item.title}`}
                >
                  {renderThumbnail(item)}
                </button>

                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {item.type === "image"
                        ? "IMAGE"
                        : item.type === "pdf"
                          ? "DOCUMENT"
                          : "VIDEO"}
                    </span>
                  </div>

                  <h3 className="line-clamp-1 font-bold">{item.title}</h3>

                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                    {item.description}
                  </p>

                  <p className="mt-3 text-xs text-gray-400">
                    Source: {item.source}
                  </p>

                  <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4">
                    <button
                      onClick={() =>
                        item.type === "pdf"
                          ? openSource(item.url)
                          : openPreview(item)
                      }
                      className="flex-1 rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-gray-700"
                    >
                      {item.type === "pdf" ? "Open Document ↗" : "Preview →"}
                    </button>

                    <button
                      onClick={() => openEditForm(item)}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-xs transition hover:bg-gray-100"
                      aria-label="Edit item"
                    >
                      ✏️
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-xs transition hover:bg-red-50"
                      aria-label="Delete item"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white px-5 py-8 text-center sm:px-8">
        <p className="text-sm font-semibold">Knowledge Library</p>
        <p className="mt-2 text-xs text-gray-400">
          A place to explore, collect, and share knowledge.
        </p>
      </footer>

      {/* ADD / EDIT FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {editingItem ? "Edit Collection" : "Add Collection"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Tambahkan sumber pengetahuan baru.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Title
                </label>
                <input
                  value={formTitle}
                  onChange={(event) => setFormTitle(event.target.value)}
                  required
                  placeholder="Collection title"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Description
                </label>
                <textarea
                  value={formDescription}
                  onChange={(event) =>
                    setFormDescription(event.target.value)
                  }
                  rows={3}
                  placeholder="Describe this collection..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  {activeTab === "image"
                    ? "Image URL"
                    : activeTab === "pdf"
                      ? "Document URL"
                      : "YouTube URL"}
                </label>

                <input
                  value={formUrl}
                  onChange={(event) => setFormUrl(event.target.value)}
                  placeholder={
                    activeTab === "video"
                      ? "https://www.youtube.com/watch?v=..."
                      : "https://example.com/..."
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-500"
                />

                {activeTab === "image" && (
                  <div className="mt-3">
                    <label className="mb-2 block text-xs text-gray-500">
                      Or upload an image from your device
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        setFormFile(event.target.files?.[0] ?? null)
                      }
                      className="w-full text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-xs file:font-semibold"
                    />
                  </div>
                )}

                {activeTab === "video" && (
                  <p className="mt-2 text-xs leading-5 text-gray-400">
                    Mendukung link YouTube biasa, youtu.be, Shorts, dan Live.
                    Video harus mengizinkan pemutaran melalui situs eksternal.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Source
                  </label>
                  <input
                    value={formSource}
                    onChange={(event) => setFormSource(event.target.value)}
                    placeholder="e.g. YouTube"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Category
                  </label>
                  <input
                    value={formCategory}
                    onChange={(event) =>
                      setFormCategory(event.target.value)
                    }
                    placeholder="e.g. Programming"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-500"
                  />
                </div>
              </div>

              {formError && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {formError}
                </p>
              )}

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-700"
                >
                  {editingItem ? "Save Changes" : "Add Collection"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* IMAGE / VIDEO PREVIEW MODAL */}
      {previewItem && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm sm:p-6"
          onClick={closePreview}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-2xl bg-[#111] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="min-w-0">
                <h2 className="truncate font-semibold text-white">
                  {previewItem.title}
                </h2>
                <p className="mt-1 text-xs text-gray-400">
                  {previewItem.source}
                </p>
              </div>

              <button
                onClick={closePreview}
                className="ml-4 rounded-lg px-3 py-2 text-white transition hover:bg-white/10"
                aria-label="Close preview"
              >
                ✕
              </button>
            </div>

            {/* IMAGE PLAYER */}
            {previewItem.type === "image" && (
              <div className="flex max-h-[75vh] items-center justify-center bg-black">
                <img
                  src={previewItem.url}
                  alt={previewItem.title}
                  className="max-h-[75vh] max-w-full object-contain"
                />
              </div>
            )}

            {/* YOUTUBE VIDEO PLAYER */}
            {previewItem.type === "video" && (
              <div className="bg-black">
                {getYoutubeEmbed(previewItem.url) ? (
                  <div className="relative aspect-video w-full">
                    <iframe
                      ref={iframeRef}
                      key={previewItem.id}
                      src={getYoutubeEmbed(previewItem.url)!}
                      title={previewItem.title}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center text-center text-white">
                    <div>
                      <p>URL video tidak valid.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col justify-between gap-4 px-5 py-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-white">
                  {previewItem.description}
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  Category: {previewItem.category}
                </p>
              </div>

              {previewItem.type === "video" && (
                <div className="flex shrink-0 flex-wrap gap-2">
                  <button
                    onClick={openFullscreen}
                    className="rounded-lg border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                  >
                    ⛶ Fullscreen
                  </button>

                  <button
                    onClick={() => openSource(previewItem.url)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
                  >
                    Open YouTube ↗
                  </button>
                </div>
              )}

              {previewItem.type === "image" && (
                <button
                  onClick={() => openSource(previewItem.url)}
                  className="shrink-0 rounded-lg border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                >
                  Open Image Source ↗
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
