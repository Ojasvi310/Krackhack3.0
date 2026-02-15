import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../../components/AppLayout";
import GlassCard from "../../components/GlassCard";
import StatusBadge from "../../components/StatusBadge";
import axios from "axios";
import api from "../../api/config";
import {
  Upload,
  MapPin,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowLeft,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const StudentNav = () => (
  <div className="flex gap-6 font-sans text-sm font-medium">
    <Link
      to="/student/dashboard"
      className="text-[#64748b] hover:text-[#1e293b] transition-colors"
    >
      Dashboard
    </Link>
    <Link
      to="/academics"
      className="text-[#64748b] hover:text-[#1e293b] transition-colors"
    >
      Academics
    </Link>
    <Link
      to="/student/calendar"
      className="text-[#64748b] hover:text-[#1e293b]"
    >
      Calendar
    </Link>
    <Link to="/student/courses" className="text-[#64748b] hover:text-[#1e293b]">
      Courses
    </Link>
    <Link
      to="/student/attendance"
      className="text-[#64748b] hover:text-[#1e293b]"
    >
      Attendance
    </Link>
    <Link
      to="/student/notifications"
      className="text-[#64748b] hover:text-[#1e293b]"
    >
      Notifications
    </Link>
    <Link
      to="/student/grievances"
      className="text-[#1e293b] hover:text-[#38b2ac] transition-colors"
    >
      Grievances
    </Link>
    <Link
      to="/student/opportunities"
      className="text-[#64748b] hover:text-[#1e293b] transition-colors"
    >
      Opportunities
    </Link>
  </div>
);

const StudentGrievances = () => {
  const [userId, setUserId] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Auth error:", error);
        return;
      }

      if (user) {
        setUserId(user.id);
      }

      setAuthLoading(false);
    };

    getUser();
  }, []);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    image: null,
  });

  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("submit");
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    "Academic",
    "Infrastructure",
    "Administration",
    "Hostel",
    "Library",
    "Canteen",
    "Sports",
    "Transportation",
    "Harassment",
    "Discrimination",
    "Other",
  ];

  const statusVariants = {
    PENDING: "warning",
    UNDER_REVIEW: "info",
    RESOLVED: "success",
    REJECTED: "danger",
  };

  const statusIcons = {
    PENDING: <Clock className="w-3.5 h-3.5" />,
    UNDER_REVIEW: <AlertCircle className="w-3.5 h-3.5" />,
    RESOLVED: <CheckCircle2 className="w-3.5 h-3.5" />,
    REJECTED: <X className="w-3.5 h-3.5" />,
  };

  const fetchGrievances = async () => {
    if (!userId) return;

    const { data, error } = await supabase
      .from("grievances")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error) setGrievances(data || []);
  };

  useEffect(() => {
    if (userId) fetchGrievances();
  }, [userId]);
  // Inside your StudentGrievances component
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `grievance-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("grievances")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("grievances")
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User not authenticated yet.");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = null;

      if (formData.image) {
        imageUrl = await uploadImage(formData.image);
      }

      const grievancePayload = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        category: formData.category,
        user_id: userId,
      };

      // const response = await axios.post(
      //   "http://localhost:8000/api/create",
      //   grievancePayload,
      // );
      const response = await api.post("/create", grievancePayload);
      if (response.data.status === "success_verified") {
        setSubmitSuccess(true);
        fetchGrievances();
      }
    } catch (error) {
      console.error("Backend Error:", error.response?.data);
      alert(error.response?.data?.detail || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <AppLayout navigation={<StudentNav />}>
      {/* Header with Back Button */}
      <div className="mb-8 flex items-center gap-4">
        <Link to="/student/dashboard">
          <button className="flex items-center gap-2 text-[#64748b] hover:text-[#1e293b] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium font-sans">
              Back to Dashboard
            </span>
          </button>
        </Link>
      </div>

      {/* Page Title */}
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-4xl font-serif text-[#1e293b] mb-2">
          Grievance Portal
        </h1>
        <p className="text-[#64748b] font-sans">
          Submit and track your campus grievances
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <GlassCard className="border-[#e2e8f0] bg-white p-1 flex gap-1">
          <button
            onClick={() => setActiveTab("submit")}
            className={`flex-1 py-3 px-6 rounded-md font-medium font-sans text-sm transition-all duration-200 ${
              activeTab === "submit"
                ? "bg-[#1e293b] text-white shadow-md"
                : "text-[#64748b] hover:text-[#1e293b] hover:bg-[#f1f5f9]"
            }`}
          >
            Submit Grievance
          </button>
          <button
            onClick={() => setActiveTab("track")}
            className={`flex-1 py-3 px-6 rounded-md font-medium font-sans text-sm transition-all duration-200 ${
              activeTab === "track"
                ? "bg-[#1e293b] text-white shadow-md"
                : "text-[#64748b] hover:text-[#1e293b] hover:bg-[#f1f5f9]"
            }`}
          >
            Track Progress ({grievances.length})
          </button>
        </GlassCard>
      </div>

      {/* Submit Form */}
      {activeTab === "submit" && (
        <GlassCard className="border-[#e2e8f0] bg-white overflow-hidden">
          <div className="bg-gradient-to-r from-[#1e293b] to-[#334155] px-8 py-6">
            <h2 className="text-2xl font-serif text-white">
              Submit a Grievance
            </h2>
            <p className="text-[#cbd5e1] mt-1 font-sans text-sm">
              We're here to help. Share your concerns with us.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#94a3b8] mb-2 font-sans">
                Grievance Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#38b2ac] focus:border-transparent transition-all font-sans text-[#1e293b]"
                placeholder="Brief title of your grievance"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#94a3b8] mb-2 font-sans">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#38b2ac] focus:border-transparent transition-all resize-none font-sans text-[#1e293b]"
                placeholder="Provide detailed information about your grievance..."
              />
            </div>

            {/* Category and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#94a3b8] mb-2 font-sans">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#38b2ac] focus:border-transparent transition-all bg-white font-sans text-[#1e293b]"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#94a3b8] mb-2 font-sans flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#38b2ac] focus:border-transparent transition-all font-sans text-[#1e293b]"
                  placeholder="Building/Room number or area"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#94a3b8] mb-2 font-sans">
                Attach Image (Optional)
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-[#e2e8f0] rounded-lg hover:border-[#38b2ac] hover:bg-[#f0fdfa] cursor-pointer transition-all">
                  <Upload className="w-4 h-4 text-[#64748b]" />
                  <span className="text-sm font-medium text-[#64748b] font-sans">
                    Upload Image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded-lg border-2 border-[#e2e8f0]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, image: null });
                        setImagePreview(null);
                      }}
                      className="absolute -top-2 -right-2 bg-[#ef4444] text-white rounded-full p-1 hover:bg-[#dc2626] transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    title: "",
                    description: "",
                    location: "",
                    category: "",
                    user_id: "b24136",
                    image: null,
                  });
                  setImagePreview(null);
                }}
                className="px-6 py-2.5 text-[#64748b] font-medium rounded-lg hover:bg-[#f1f5f9] transition-colors font-sans"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-2.5 bg-[#1e293b] text-white font-medium rounded-lg hover:bg-[#334155] focus:ring-4 focus:ring-[#38b2ac] focus:ring-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl font-sans"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Grievance</span>
                  </>
                )}
              </button>
            </div>

            {/* Success Message */}
            {submitSuccess && (
              <div className="flex items-center gap-3 p-4 bg-[#f0fdf4] border border-[#86efac] rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-[#16a34a]" />
                <div>
                  <p className="font-medium text-[#166534] font-sans">
                    Grievance Submitted Successfully!
                  </p>
                  <p className="text-sm text-[#15803d] font-sans">
                    You can track the progress in the Track Progress tab.
                  </p>
                </div>
              </div>
            )}
          </form>
        </GlassCard>
      )}

      {/* Track Progress */}
      {activeTab === "track" && (
        <GlassCard className="border-[#e2e8f0] bg-white overflow-hidden">
          <div className="bg-gradient-to-r from-[#1e293b] to-[#334155] px-8 py-6">
            <h2 className="text-2xl font-serif text-white">
              Track Your Grievances
            </h2>
            <p className="text-[#cbd5e1] mt-1 font-sans text-sm">
              Monitor the status of all your submitted grievances
            </p>
          </div>

          <div className="p-8">
            {grievances.length === 0 ? (
              <div className="text-center py-16">
                <AlertCircle className="w-16 h-16 text-[#cbd5e1] mx-auto mb-4" />
                <p className="text-[#64748b] text-lg font-sans">
                  No grievances submitted yet
                </p>
                <p className="text-[#94a3b8] text-sm mt-2 font-sans">
                  Submit your first grievance to get started
                </p>
                <button
                  onClick={() => setActiveTab("submit")}
                  className="mt-6 px-6 py-2.5 bg-[#1e293b] text-white font-medium rounded-lg hover:bg-[#334155] transition-colors font-sans"
                >
                  Submit Grievance
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {grievances.map((grievance) => (
                  <GlassCard
                    key={grievance.id}
                    hover
                    className="border-[#e2e8f0] bg-white p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-[#1e293b] font-serif">
                            {grievance.title}
                          </h3>
                          <StatusBadge
                            variant={
                              statusVariants[grievance.status] || "warning"
                            }
                            className="flex items-center gap-1.5"
                          >
                            {statusIcons[grievance.status] ||
                              statusIcons.pending}
                            <span className="capitalize">
                              {grievance.status
                                ? grievance.status.replace("_", " ")
                                : "PENDING"}
                            </span>
                          </StatusBadge>
                        </div>
                        <p className="text-[#64748b] mb-4 leading-relaxed font-sans">
                          {grievance.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1.5 text-[#64748b] font-sans">
                            <span className="font-medium">Category:</span>
                            <span className="px-2 py-0.5 bg-[#f1f5f9] text-[#1e293b] rounded">
                              {grievance.category}
                            </span>
                          </div>
                          {grievance.location && (
                            <div className="flex items-center gap-1.5 text-[#64748b] font-sans">
                              <MapPin className="w-3.5 h-3.5" />
                              <span>{grievance.location}</span>
                            </div>
                          )}
                          {grievance.priority && (
                            <div className="flex items-center gap-1.5 text-[#64748b] font-sans">
                              <span className="font-medium">Priority:</span>
                              <StatusBadge
                                variant={
                                  grievance.priority === "HIGH"
                                    ? "danger"
                                    : grievance.priority === "MEDIUM"
                                      ? "warning"
                                      : "success"
                                }
                              >
                                {grievance.priority}
                              </StatusBadge>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-[#94a3b8] ml-4 font-sans">
                        {new Date(grievance.created_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}
          </div>
        </GlassCard>
      )}
    </AppLayout>
  );
};

export default StudentGrievances;
