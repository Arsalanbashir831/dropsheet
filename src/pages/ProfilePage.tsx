
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Ahmed Khan",
    email: "ahmed.khan@example.com",
    username: "ahmedk",
    language: "en-US",
    secondaryEmail: "ahmed.khan.work@example.com"
  });
  
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const handleSaveName = () => {
    setIsEditingName(false);
    toast.success("Name updated successfully!");
  };

  const handleSaveUsername = () => {
    setIsEditingUsername(false);
    toast.success("Username updated successfully!");
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.new !== passwordData.confirm) {
      toast.error("New passwords do not match");
      return;
    }
    
    if (passwordData.new.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    
    toast.success("Password updated successfully!");
    setPasswordData({ current: "", new: "", confirm: "" });
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "This action is irreversible. Are you sure you want to delete your account?"
    );
    
    if (confirmed) {
      toast.success("Account deletion initiated");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          Dashboard / Profile
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Profile
          </h1>
          <p className="text-gray-600">
            View and edit your name, email, password, and preferences.
          </p>
        </div>

        <div className="space-y-8">
          {/* Profile Info */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your personal information and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-green-100 text-green-600 text-xl">
                    AK
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline">Upload Photo</Button>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label>Full Name</Label>
                {isEditingName ? (
                  <div className="flex gap-3">
                    <Input
                      value={profileData.fullName}
                      onChange={(e) => setProfileData(prev => ({ 
                        ...prev, 
                        fullName: e.target.value 
                      }))}
                      className="flex-1"
                    />
                    <Button onClick={handleSaveName} size="sm">Save</Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsEditingName(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <span>{profileData.fullName}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setIsEditingName(true)}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="p-3 bg-gray-50 rounded-md">
                  <span className="text-gray-700">{profileData.email}</span>
                </div>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label>Username</Label>
                {isEditingUsername ? (
                  <div className="flex gap-3">
                    <Input
                      value={profileData.username}
                      onChange={(e) => setProfileData(prev => ({ 
                        ...prev, 
                        username: e.target.value 
                      }))}
                      className="flex-1"
                    />
                    <Button onClick={handleSaveUsername} size="sm">Save</Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsEditingUsername(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <span>{profileData.username}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setIsEditingUsername(true)}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </div>

              {/* Language */}
              <div className="space-y-2">
                <Label>Language</Label>
                <Select value={profileData.language} onValueChange={(value) => 
                  setProfileData(prev => ({ ...prev, language: value }))
                }>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="ur-PK">Urdu (Pakistan)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Secondary Email */}
              <div className="space-y-2">
                <Label>Secondary Email</Label>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <span>{profileData.secondaryEmail}</span>
                  <Button variant="ghost" size="sm" className="text-red-600">
                    Remove
                  </Button>
                </div>
                <Button variant="outline" size="sm">Add Secondary Email</Button>
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your account password for better security.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.current}
                    onChange={(e) => setPasswordData(prev => ({ 
                      ...prev, 
                      current: e.target.value 
                    }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.new}
                    onChange={(e) => setPasswordData(prev => ({ 
                      ...prev, 
                      new: e.target.value 
                    }))}
                    required
                  />
                  <p className="text-xs text-gray-600">
                    Password must be at least 8 characters long
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData(prev => ({ 
                      ...prev, 
                      confirm: e.target.value 
                    }))}
                    required
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Update Password
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setPasswordData({ current: "", new: "", confirm: "" })}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800">Account Actions</CardTitle>
              <CardDescription>
                Manage your account settings and data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline" 
                  className="text-red-600 border-red-600"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
              <p className="text-xs text-gray-600">
                Deleting your account will permanently remove all your data and cannot be undone.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
