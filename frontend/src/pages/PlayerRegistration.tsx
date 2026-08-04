import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { Separator } from "@/components/ui/Separator"
import { CameraIcon } from "lucide-react"
import Card3D from "@/components/Card3D"
import { useAuth } from "@/context/AuthContext"
import api from "@/api/axios"
const SPORTS = ["Cricket", "Football", "Volleyball", "Handball", "Basketball", "Hockey", "Tennis", "Badminton", "Futsal", "Kabaddi"]
const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Professional"]


const POSITIONS: Record<string, string[]> = {
  Cricket: ["Batsman", "Bowler", "All-rounder", "Wicket Keeper", "Captain"],
  Football: ["Goalkeeper", "Defender", "Midfielder", "Forward", "Captain"],
  Basketball: ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"],
  Volleyball: ["Setter", "Spiker", "Blocker", "Libero", "Server"],
  Handball: ["Goalkeeper", "Wing", "Back", "Center", "Pivot"],
  Hockey: ["Forward", "Midfielder", "Defender", "Goalkeeper"],
  Badminton: ["Singles", "Doubles", "Mixed Doubles"],
  Tennis: ["Singles", "Doubles"],
  Futsal: ["Goalkeeper", "Defender", "Winger", "Pivot"],
  Kabaddi: ["Raider", "Defender", "All-rounder"],
}
const PROVINCES = [
  "Koshi",
  "Madhesh",
  "Bagmati",
  "Gandaki",
  "Lumbini",
  "Karnali",
  "Sudurpashchim",
];
export default function PlayerRegistration() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [step, setStep] = useState(1)
  const [selectedSports, setSelectedSports] = useState<string[]>([])
  const [selectedPositions, setSelectedPositions] = useState<string[]>([])
  const [formData, setFormData] = useState({ fullname: "", email: "", password: "", gender: "", age: "", phoneNumber
    : "", location: "", province: "", bio: "", skillLevel: "" })
  const [errors, setErrors] = useState({ fullname: "", email: "", password: "", location: "", province: "", gender: "", phoneNumber: "",
     age: "", });
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setPhotoError("Only JPG and PNG files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setPhotoError("File size must be less than 5MB.");
      return;
    }

    setProfilePhoto(file);
    setPhotoError("");
    setPreview(URL.createObjectURL(file));
    //preview image

  };


  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^98\d{8}$/.test(phone);
  };

  const validatePassword = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);
  };

  const validateAge = (age: string) => {
    const num = Number(age);
    return num >= 13 && num <= 100;
  };
  const validateLocation = (location: string = "") => {
    return /^[A-Za-z\s]{2,}$/.test(location.trim());
  };
  const validateProvince = (province: string = "") => {
  return province.trim() !== "";
};
 
  const handleSubmit = async () => {
    //validate
    if (!profilePhoto) {
      setPhotoError("Profile photo is required.");
      alert("Profile photo is required");
      return;
    }
    if (!formData.gender) {
      setErrors((prev) => ({
        ...prev,
        gender: "Please select your gender.",
      }));
      return;
    }
    setLoading(true);
    try {
      const form = new FormData();//Create a FormData object becasue we are sending multipart/form-data to the backend
      form.append("fullname", formData.fullname);//append method is used to add new value onto an existing FormData object.
      //it takes two argument they are key and value.
      form.append("email", formData.email);
      form.append("password", formData.password);
      form.append("age", formData.age);
      form.append("gender", formData.gender);
      form.append("phoneNumber", formData.phoneNumber);
      form.append("location", formData.location);
      form.append("province", formData.province);
      form.append("bio", formData.bio);
      form.append("skillLevel", formData.skillLevel);//this is not a array why because skilllevel is single value not multiple values
      // The player model stores one sport and one position, not JSON arrays.
      form.append("sport", selectedSports[0]);
      form.append("position", selectedPositions[0]);
      form.append("profilePhoto", profilePhoto);//append the profile photo to the form data

      await api.post("/auth/register", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Registration does not issue a token, so sign in once automatically.
      const loginResponse = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      const { token, user } = loginResponse.data;

      if (!token || !user) {
        throw new Error("Registration succeeded, but automatic sign-in failed. Please log in.");
      }

      login(user, token);
      navigate(user.role === "admin" ? "/team-dashboard" : "/user-dashboard");
    } catch (error: any) {
      console.log(error.response?.data || error);
      setPhotoError(
        error.response?.data?.message || "Registration failed"
      );
    } finally { //finally always runs after try and catch block whether the try block is sucessful or not.
      setLoading(false);
    }
  }


  const handleNext = () => {
    const newErrors = {
      fullname: "",
      email: "",
      password: "",
      phoneNumber: "",
      age: "",
      gender: "",
      location: "",
      province: ""
    };

    if (formData.fullname.trim().length < 3) {
      newErrors.fullname = "Full name must be at least 3 characters.";

    }
 if (!validateProvince(formData.province)) {
    newErrors.province = "Please select a province.";
  }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Enter a valid email.";

    }
    if (!validateLocation(formData.location)) {
      newErrors.location = "Enter location of your city";
    }
    if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid Nepal phone number.";
    }

    if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, number and special character.";
    }

    if (!validateAge(formData.age)) {
      newErrors.age = "Age must be between 13 and 100.";
    }

    setErrors(newErrors);

    if (
      newErrors.fullname ||
      newErrors.email ||
      newErrors.phoneNumber ||
      newErrors.password ||
      newErrors.age ||
      newErrors.location ||
      newErrors.province
    ) {
      return;
    }

    setStep(2);
  };


  function toggleSport(sport: string) {
    // The backend schema accepts one sport only.
    setSelectedSports((prev) => prev[0] === sport ? [] : [sport])
    setSelectedPositions([])
  }

  function togglePosition(pos: string) {
    // The backend schema accepts one position only.
    setSelectedPositions((prev) => prev[0] === pos ? [] : [pos])
  }

  const allPositions = [...new Set(selectedSports.flatMap((s) => POSITIONS[s] || []))]

  return (
    <div className="flex flex-col">
  <section className="relative overflow-hidden py-16 md:py-24">

  {/* Background Image */}
  <img
    src="/rega.avif" // Change to your image name
    alt="Player Registration"
    className="absolute inset-0 h-full w-full object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Glow Effect */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.15)_0%,transparent_60%)]" />

  {/* Content */}
  <div className="relative z-10 mx-auto max-w-6xl px-4">

    <div className="flex flex-col items-center text-center">

      <Badge
        variant="secondary"
        className="mb-3 border border-white/20 bg-white/10 text-white backdrop-blur-md"
      >
        Free Registration
      </Badge>

      <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
        Register as a{" "}
        <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
          Player
        </span>
      </h1>

      <p className="mt-3 max-w-xl text-white/80">
      <span className="text-white">
        Create your player profile. Add your photo, skills, and start finding
        teams or tournaments.
        </span>
      </p>

    </div>

  </div>

</section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex size-8 items-center justify-center rounded-full text-sm font-medium ${step >= s ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white" : "bg-muted text-muted-foreground"
                  }`}>
                  {step > s ? "✓" : s}
                </div>
                <span className={`text-sm max-sm:hidden ${step >= s ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {s === 1 ? "Personal Info" : s === 2 ? "Sports & Skills" : "Photo & Submit"}
                </span>
              </div>
            ))}
          </div>

          {step === 1 && (
            <Card3D><Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription style={{ color: "gray" }}>Fill in your basic details to get started.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name *</label>
                    <Input placeholder="Your full name" value={formData.fullname} onChange={(e) => setFormData({ ...formData, fullname: e.target.value })} />
                    <p style={{ color: "red" }}>{errors.fullname}</p>
                  </div>



                  <p className="text-red-500 text-sm">{errors.gender}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number *</label>
                  <Input placeholder="98XXXXXXXX" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
                  {errors.phoneNumber && (
                    <p style={{ color: "red" }}>{errors.phoneNumber}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email *</label>
                  <Input type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  {errors.email && (
                    <p style={{ color: "red" }}>{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                  {errors.password && (
                    <p style={{ color: "red" }}>{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Location / City *</label>
                  <Input placeholder="Pokhara" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                  {errors.location && (
                    <p style={{ color: "red" }}>{errors.location}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Province *</label>

                  <select
                    value={formData.province}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        province: e.target.value,
                      })
                    }
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="">Select Province</option>

                    {PROVINCES.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>

                  {errors.province && (
                    <p className="text-red-500 text-sm">{errors.province}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Age:</label>
                  <Input
                    type="number"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                  />
                  {errors.age && (
                    <p style={{ color: "red" }}>{errors.age}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Gender</label>

                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value })
                        }
                      />
                      Male
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value })
                        }
                      />
                      Female
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Other"
                        checked={formData.gender === "Other"}
                        onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value })
                        }
                      />
                      Other
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio / About You</label>
                  <textarea rows={3} className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500 dark:border-white/10"
                    placeholder="Tell us about your sports experience..." value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleNext}>Next Step</Button>
                </div>
              </CardContent>
            </Card></Card3D>
          )}

          {step === 2 && (
            <Card3D><Card>
              <CardHeader>
                <CardTitle>Sports & Skills</CardTitle>
                <CardDescription style={{ color: "gray" }}>Select the sports you play and your positions/skills.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium">Which sports do you play? *</label>
                  <div className="flex flex-wrap gap-2">
                    {SPORTS.map((sport) => (
                      <Badge key={sport} variant={selectedSports.includes(sport) ? "default" : "outline"}
                        className={`cursor-pointer px-3 py-1.5 text-sm ${selectedSports.includes(sport) ? "bg-gradient-to-r from-violet-600 to-indigo-600" : ""}`}
                        onClick={() => toggleSport(sport)}>{sport}</Badge>
                    ))}
                  </div>
                </div>
                {allPositions.length > 0 && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Your Positions / Skills *</label>
                    <div className="flex flex-wrap gap-2">
                      {allPositions.map((pos) => (
                        <Badge key={pos} variant={selectedPositions.includes(pos) ? "default" : "outline"}
                          className={`cursor-pointer px-3 py-1.5 text-sm ${selectedPositions.includes(pos) ? "bg-gradient-to-r from-emerald-600 to-teal-600" : ""}`}
                          onClick={() => togglePosition(pos)}>{pos}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Skill Level *</label>
                  <div className="flex flex-wrap gap-2">
                    {SKILL_LEVELS.map((level) => (
                      <Badge key={level} variant={formData.skillLevel === level ? "default" : "outline"}
                        className={`cursor-pointer px-4 py-1.5 text-sm ${formData.skillLevel === level ? "bg-gradient-to-r from-amber-600 to-orange-600" : ""}`}
                        onClick={() => setFormData({ ...formData, skillLevel: level })}>{level}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button onClick={() => setStep(3)} disabled={selectedSports.length === 0 || selectedPositions.length === 0 || !formData.skillLevel}>Next Step</Button>
                </div>
              </CardContent>
            </Card></Card3D>
          )}

          {step === 3 && (
            <Card3D><Card>
              <CardHeader>
                <CardTitle>Profile Photo & Submit</CardTitle>
                <CardDescription style={{ color: "gray" }}>Upload your photo to complete your player profile.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <label
                    htmlFor="profilePhoto"
                    className="flex size-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-muted-foreground/30 bg-muted/50 hover:border-violet-500 transition-colors"
                  >

                    {preview ? (
                      <img
                        src={preview}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-muted-foreground">
                        <CameraIcon className="size-8" />
                        <span className="text-xs">Upload Photo</span>
                      </div>
                    )}

                  </label>

                  <input
                    id="profilePhoto"
                    type="file"
                    accept="image/png,image/jpeg"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />

                  <p className="text-xs text-muted-foreground bg-violet-200  px-2 py-1 rounded-md ">
                    Photo is required. JPG, PNG (max 5MB)
                  </p>

                  {photoError && (
                    <p className="bg-red-500 rounded px-2  text-sm font-serif" style={{ color: "white" }}>
                      {photoError}
                    </p>
                  )}

                </div>
                <Separator />
                <div className="rounded-lg bg-muted/30 p-4">
                  <p className="mb-2 text-xl font-serif font-medium bg-gray-200 text-center" style={{ color: 'blue' }}>Profile Summary</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p ><span className="font-medium text-foreground ">Name:</span> <span className="text-violet-500">{formData.fullname}</span></p>
                    <p><span className="font-medium text-foreground">Location:</span> <span className="text-violet-500">{formData.location}</span></p>
                    <p><span className="font-medium text-foreground">Sports:</span> <span className="text-violet-500">{selectedSports.join(", ")}</span></p>
                    <p><span className="font-medium text-foreground">Skills:</span> <span className="text-violet-500">{selectedPositions.join(", ")}</span></p>
                    <p><span className="font-medium text-foreground">Level:</span><span className="text-violet-500"> {formData.skillLevel}</span></p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>Back</Button>

                  <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 gap-1.5"
                    disabled={loading} onClick={handleSubmit}>
                    {loading ? "Registering..." : "Submit Registration"}
                  </Button>

                </div>
              </CardContent>
            </Card></Card3D>
          )}
        </div>
      </section>
    </div>
  )
}
