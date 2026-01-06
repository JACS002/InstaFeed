import { useState, useEffect } from "react";
import { uploadPost } from "../api/posts.service";
import { Upload, X, Image, Video } from "lucide-react";

export default function UploadPost({ onUpload }: { onUpload: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (
        droppedFile.type.startsWith("image/") ||
        droppedFile.type.startsWith("video/")
      ) {
        setFile(droppedFile);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Selecciona un archivo");

    try {
      setLoading(true);
      await uploadPost(file, caption);
      setFile(null);
      setCaption("");
      onUpload();
    } catch {
      alert("Error subiendo post");
    } finally {
      setLoading(false);
    }
  };

  const isVideo = file?.type.startsWith("video/");

  return (
    <div className="card mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Upload size={24} />
        Crear nuevo post
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload Area */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {!file ? (
            <>
              <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                {isVideo ? <Video size={64} /> : <Image size={64} />}
              </div>
              <p className="text-gray-700 mb-2">
                Arrastra una imagen o video aquí
              </p>
              <p className="text-sm text-gray-500 mb-4">o</p>
              <label className="btn-primary cursor-pointer inline-flex items-center gap-2">
                <Upload size={20} />
                Seleccionar archivo
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-4">
                PNG, JPG, GIF, MP4 hasta 50MB
              </p>
            </>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setFile(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 z-10"
              >
                <X size={20} />
              </button>

              {isVideo ? (
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <video
                    src={preview || ""}
                    controls
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <img
                  src={preview || ""}
                  alt="Preview"
                  className="max-h-96 mx-auto rounded-lg"
                />
              )}

              <p className="text-sm text-gray-600 mt-4">
                {file.name} ({Math.round(file.size / 1024)} KB)
              </p>
            </div>
          )}
        </div>

        {/* Caption */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción
          </label>
          <textarea
            placeholder="¿Qué quieres compartir?"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="input-field min-h-[100px] resize-none"
            maxLength={500}
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {caption.length}/500 caracteres
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !file}
          className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Publicando...
            </>
          ) : (
            <>
              <Upload size={20} />
              Publicar
            </>
          )}
        </button>
      </form>
    </div>
  );
}
