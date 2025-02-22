"use client"

interface Profile {
  accountId: Number;
  username: String;
  email: String;
  provider: String;
  profile: String;
  roles: String[];
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}

import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function Profile() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  if (status === 'unauthenticated') {
    window.location.href = '/'
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/auth/profile/${session?.user?.name}`);
        setProfile(res.data.profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session]);

  let ProfileImg = profile?.profile || '';

  return (
    <>
      {loading ? (
        <>
          <div className="bg-[#282b30] rounded-md p-5 mb-3">
            <h4 className="text-center text-2xl font-semibold mb-3">Loading...</h4>
          </div>
        </>
      ) : (
        <>
          <h4 className="text-2xl font-semibold mb-3">Profile</h4>
          <div className="bg-[#282b30] rounded-md p-5 mb-3">
            <div className="flex flex-row justify-between items-start mb-6">
              <div className="flex items-center">
                <Image src={`${ProfileImg}`} width={100} height={100} alt={`${profile?.username}`} className="rounded-full" />
                <h3 className="text-3xl font-semibold ml-8">โปรไฟล์ของคุณ {profile?.username}</h3>
              </div>

              <div>
                {profile?.roles && (profile.roles.includes('superadmin') || profile.roles.includes('admin') || profile.roles.includes('editor')) && (
                  <button onClick={() => window.location.href = '/admin/dashboard'} className="font-bold px-10 py-1.5 rounded-lg bg-orange-400/20 border-2 border-orange-400 text-orange-400 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition duration-300 ease-out mr-2">
                    จัดการหลังบ้าน
                  </button>
                )}
                <button onClick={() => signOut()} className="font-bold px-10 py-1.5 rounded-lg bg-red-400/20 border-2 border-red-400 text-red-400 hover:bg-red-500 hover:border-red-500 hover:text-white transition duration-300 ease-out">ออกจากระบบ</button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-4 mx-6">
              <div className="flex flex-col">
                <span className="text-gray-400">ชื่อผู้ใช้:</span>
                <span className="text-lg">{profile?.username}</span>
                <span className="text-gray-400">อีเมล์:</span>
                <span className="text-lg">{profile?.email}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-400">บทบาท:</span>
                <span className="text-1xl font-semibold">
                  <div className="flex flex-wrap">
                    {profile?.roles && profile.roles.length > 0 ? (
                      profile.roles
                        .sort((a, b) => {
                          if (a.toLowerCase() === 'superadmin') return -1;
                          if (b.toLowerCase() === 'superadmin') return 1;
                          return 0;
                        })
                        .map((role, index) => {
                          let roleColor = '';
                          let roleIcon = null;

                          switch (role.toLowerCase()) {
                            case 'superadmin':
                              roleColor = 'text-rose-500';
                              roleIcon = <i className="fa fa-crown inline-block mr-1" />;
                              break;
                            case 'admin':
                              roleColor = 'text-blue-500';
                              roleIcon = <i className="fa fa-shield inline-block mr-1" />;
                              break;
                            case 'editor':
                              roleColor = 'text-orange-400';
                              roleIcon = <i className="fa fa-edit inline-block mr-1" />;
                              break;
                            default:
                              roleColor = 'text-gray-500';
                          }

                          return (
                            <span key={index} className={`my-1 px-4 ${roleColor} font-medium bg-[#36393e] border border-[#424549] rounded-full flex items-center mr-2`}>
                              <span className={`w-3 h-3 rounded-full inline-block mr-2 bg-${roleColor.replace('text-', '')}`}></span>
                              {roleIcon}
                              {role.toUpperCase()}
                            </span>
                          );
                        })
                    ) : (
                      <span>No roles assigned</span>
                    )}
                  </div>
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-400">วันที่สมัคร:</span>
                <span>
                  {profile?.createdAt
                    ? new Date(profile.createdAt).toLocaleString("th-TH", {
                        timeZone: "Asia/Bangkok",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : "No creation date"}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-400">วันที่เข้าสู่ระบบล่าสุด:</span>
                <span>
                  {profile?.lastLogin
                    ? new Date(profile.lastLogin).toLocaleString("th-TH", {
                        timeZone: "Asia/Bangkok",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : "No creation date"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#282b30] rounded-md p-5">
            <h4 className="text-2xl font-semibold mb-3">อนิเมที่ถูกบันทึกเป็นรายการโปรด</h4>
            
            <div className="flex flex-col">
              <span className="text-gray-400">ยังไม่มีอนิเมในรายการโปรด</span>
            </div>
          </div>
        </>
      )}
    </>
  )
}