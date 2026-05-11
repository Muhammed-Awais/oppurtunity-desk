"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TextAlignLeft,
  Image as ImageIcon,
  Tag,
  CheckCircle,
  ArrowRight,
} from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

const typeOptions = [
  { value: "job", label: "Job" },
  { value: "scholarship", label: "Scholarship" },
  { value: "internship", label: "Internship" },
];

import { opportunityService } from "@/lib/services/opportunityService";

export default function AdminPostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("job");
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState("");
  const [organization, setOrganization] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const opportunityData = {
        title,
        description,
        type: type as "job" | "scholarship" | "internship",
        location,
        deadline,
        organization,
        tags: tags.split(",").map((t) => t.trim()).filter((t) => t !== ""),
        image: imageUrl.trim() || "",
      };

      await opportunityService.add(opportunityData);
      setSubmitted(true);
    } catch (err) {
      console.error("Error publishing opportunity:", err);
      setError("Failed to publish opportunity. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setType("job");
    setLocation("");
    setDeadline("");
    setOrganization("");
    setTags("");
    setImageUrl("");
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="p-6 md:p-10 max-w-[800px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }}
          className="card-shell"
        >
          <div className="card-core p-8 md:p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-accent mx-auto mb-6"
            >
              <CheckCircle size={32} weight="fill" />
            </motion.div>
            <h2 className="text-xl font-semibold text-zinc-900 mb-2">
              Posted Successfully
            </h2>
            <p className="text-sm text-zinc-400 mb-8 max-w-[36ch] mx-auto">
              Your opportunity has been published and is now visible to students.
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-accent active:scale-[0.97]"
            >
              Post Another
              <ArrowRight size={15} weight="bold" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-[800px]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 mb-1">
          Post Opportunity
        </h1>
        <p className="text-sm text-zinc-400">
          Create a new job, scholarship, or internship listing for students.
        </p>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }}
        className="card-shell"
      >
        <div className="card-core p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type Toggle */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">
                Type
              </label>
              <div className="flex gap-2">
                {typeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setType(opt.value)}
                    className={cn(
                      "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 active:scale-[0.97]",
                      type === opt.value
                        ? "bg-zinc-900 text-white"
                        : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="post-title" className="block text-sm font-medium text-zinc-700">
                Title
              </label>
              <input
                id="post-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Junior Frontend Developer"
                required
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-300 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/10"
              />
            </div>

            {/* Organization */}
            <div className="space-y-2">
              <label htmlFor="post-org" className="block text-sm font-medium text-zinc-700">
                Organization
              </label>
              <input
                id="post-org"
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g. Netsol Technologies"
                required
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-300 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/10"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="post-desc" className="block text-sm font-medium text-zinc-700">
                Description
              </label>
              <textarea
                id="post-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the opportunity, requirements, and benefits..."
                required
                rows={5}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-300 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/10 resize-none"
              />
            </div>

            {/* Location + Deadline row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="post-location" className="block text-sm font-medium text-zinc-700">
                  Location
                </label>
                <input
                  id="post-location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Lahore, Pakistan"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-300 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/10"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="post-deadline" className="block text-sm font-medium text-zinc-700">
                  Deadline
                </label>
                <input
                  id="post-deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-300 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/10"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label htmlFor="post-tags" className="block text-sm font-medium text-zinc-700">
                Tags
              </label>
              <input
                id="post-tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Comma-separated, e.g. Full-Time, Remote, Tech"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-300 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/10"
              />
              <p className="text-[11px] text-zinc-400">
                Separate each tag with a comma
              </p>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label htmlFor="post-image" className="block text-sm font-medium text-zinc-700">
                Cover Image URL (optional)
              </label>
              <input
                id="post-image"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-300 focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/10"
              />
              <p className="text-[11px] text-zinc-400">
                Paste a direct link to an image (PNG, JPG, WebP)
              </p>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-rose-500 bg-rose-50 rounded-xl px-4 py-3 border border-rose-200/50">
                {error}
              </p>
            )}

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || !title.trim() || !description.trim()}
                className={cn(
                  "group w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3.5 text-sm font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent active:scale-[0.98]",
                  (loading || !title.trim() || !description.trim()) &&
                    "opacity-60 cursor-not-allowed hover:bg-zinc-900"
                )}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Publishing...
                  </span>
                ) : (
                  <>
                    Publish Opportunity
                    <ArrowRight
                      size={16}
                      weight="bold"
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
