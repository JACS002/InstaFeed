import { useEffect, useState } from "react";
import { getFeed, deletePost } from "../api/posts.service";
import { useAuth } from "../context/AuthContext";
import UploadPost from "./UploadPost";
import {
  LogOut,
  Trash2,
  Heart,
  MessageCircle,
  Share,
  MoreVertical,
} from "lucide-react";
import { Footer } from "../components/Footer";

interface Post {
  id: string;
  caption: string;
  url: string;
  file_type: string;
  created_at: string;
  email: string;
  is_owner: boolean;
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { logout, token } = useAuth();
  const [loading, setLoading] = useState(true);

  const loadFeed = async () => {
    try {
      const data = await getFeed();
      setPosts(data);
    } catch {
      alert("Error cargando feed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("¿Seguro que quieres borrar este post?")) return;

    try {
      await deletePost(postId);
      loadFeed();
    } catch {
      alert("Error al borrar post");
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">📸</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">InstaFeed</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Mostrar que el usuario está autenticado */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {token ? "✓" : "?"}
                </span>
              </div>
              <span className="font-medium text-gray-700">
                {token ? "Usuario Conectado" : "Desconectado"}
              </span>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Upload Section */}
        <div className="mb-8">
          <UploadPost onUpload={loadFeed} />
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
              <MessageCircle size={96} />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No hay posts todavía
            </h3>
            <p className="text-gray-500">Sé el primero en publicar algo</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
              >
                {/* Post Header - Más compacta */}
                <div className="p-3 flex items-center justify-between border-b">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex-shrink-0 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">
                        {post.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-800 truncate text-sm">
                        {post.email}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {new Date(post.created_at).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                  </div>

                  {post.is_owner && (
                    <div className="flex-shrink-0 ml-2">
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-gray-400 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                        title="Eliminar post"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Media - Altura fija */}
                <div className="relative bg-black" style={{ height: "300px" }}>
                  {post.file_type === "image" ? (
                    <img
                      src={post.url}
                      alt={post.caption}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={post.url}
                      controls
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Actions - Más compactas */}
                <div className="p-4 border-t flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <button
                        className="flex items-center gap-1.5 text-gray-600 hover:text-red-500 transition-colors p-1"
                        title="Me gusta"
                      >
                        <Heart size={18} />
                        <span className="text-xs font-medium hidden sm:inline">
                          Me gusta
                        </span>
                      </button>
                      <button
                        className="flex items-center gap-1.5 text-gray-600 hover:text-blue-500 transition-colors p-1"
                        title="Comentar"
                      >
                        <MessageCircle size={18} />
                        <span className="text-xs font-medium hidden sm:inline">
                          Comentar
                        </span>
                      </button>
                      <button
                        className="flex items-center gap-1.5 text-gray-600 hover:text-green-500 transition-colors p-1"
                        title="Compartir"
                      >
                        <Share size={18} />
                        <span className="text-xs font-medium hidden sm:inline">
                          Compartir
                        </span>
                      </button>
                    </div>

                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <MoreVertical size={18} />
                    </button>
                  </div>

                  {/* Caption - Con scroll si es necesario */}
                  <div className="flex-1 min-h-0 overflow-hidden">
                    <p className="text-gray-800 text-sm leading-relaxed">
                      <span className="font-semibold mr-1.5">
                        {post.email.split("@")[0]}
                      </span>
                      {post.caption}
                    </p>
                  </div>

                  {/* Fecha completa en tooltip */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Publicado el{" "}
                      {new Date(post.created_at).toLocaleString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
