"use client";

import React, { useState } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function BackgroundBeamsWithCollisionDemo() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          discord: formData.get("discord"),
          message: formData.get("message"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong");
      }

      setSubmitted(true); // show success UI
      form.reset(); // clear form fields
    } catch (err: any) {
      alert(err.message || "Submission failed");
    } finally {
      setLoading(false); // allow re-submit
    }
  }

  return (
    <div className="relative w-full h-screen">
      <BackgroundBeamsWithCollision>
        <div className="relative z-50 h-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Left content */}
          <div className="flex items-start justify-start">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white font-sans tracking-tight text-left">
              <div className="relative inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-3 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)] space-y-3">
                  <div>Mark your presence</div>
                  <div>by filling the form.</div>
                </div>

                <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-3 space-y-3">
                  <div>Mark your presence</div>
                  <div>by filling the form.</div>
                </div>
              </div>
            </h2>
          </div>

          {/* Right form */}
          <div className="flex justify-end">
            <div className="w-full max-w-2xl min-h-[560px] backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl p-12 shadow-2xl">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Join the waitlist
              </h3>

              {submitted ? (
                <div className="text-green-400 space-y-4">
                  <p>✅ Submitted successfully!</p>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSubmitted(false)} // ✅ reopen form
                  >
                    Submit another response
                  </Button>

                  <Link href="/list">
                    <Button variant="outline" className="w-full">
                      View Public List
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <Input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    className="h-12 bg-black/40 border-white/10 text-white placeholder:text-white/50"
                  />

                  <Input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    required
                    className="h-12 bg-black/40 border-white/10 text-white placeholder:text-white/50"
                  />

                  <Input
                    name="discord"
                    type="text"
                    placeholder="Discord username (optional)"
                    className="h-12 bg-black/40 border-white/10 text-white placeholder:text-white/50"
                  />

                  <textarea
                    name="message"
                    placeholder="Tell us why you want to join..."
                    className="w-full min-h-[140px] rounded-md bg-black/40 border border-white/10 text-white placeholder:text-white/50 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />

                  <Button
                    disabled={loading}
                    className="w-full py-6 text-lg bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-white hover:opacity-90"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button>

                  <Link href="/list">
                    <Button variant="outline" className="w-full">
                      View Public List
                    </Button>
                  </Link>
                </form>
              )}
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
