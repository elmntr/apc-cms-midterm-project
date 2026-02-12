"use client";

import { useState } from "react";
import { useAuth } from "./AuthProvider";

const LoginScreen = () => {
  const { login } = useAuth();
  const [phrase, setPhrase] = useState("");
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(phrase);
    if (!success) {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
      {/* Decorative Line */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-[1px] bg-tan"></div>
        <span className="text-xs tracking-[0.3em] text-tan font-medium">PRIVATE</span>
        <div className="w-12 h-[1px] bg-tan"></div>
      </div>

      {/* Title */}
      <h1 
        className="text-4xl md:text-5xl lg:text-6xl text-brown text-center mb-4"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        The Unseen
        <br />
        <span className="italic text-tan">Journey</span>
      </h1>

      <p className="text-brown/60 text-center max-w-sm mb-12 leading-relaxed">
        This is a private collection. Please enter the secret phrase to continue.
      </p>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className={`mb-6 ${isShaking ? 'animate-shake' : ''}`}>
          <input
            type="password"
            value={phrase}
            onChange={(e) => {
              setPhrase(e.target.value);
              setError(false);
            }}
            placeholder="Enter secret phrase..."
            className={`w-full px-6 py-4 bg-transparent border-2 text-brown placeholder:text-brown/40 focus:outline-none transition-colors text-center tracking-wider ${
              error 
                ? 'border-red-400 focus:border-red-400' 
                : 'border-tan/40 focus:border-tan'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-sm text-center mt-3 tracking-wide">
              Incorrect phrase. Please try again.
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-brown text-cream tracking-[0.2em] text-sm font-medium hover:bg-brown/90 transition-colors"
        >
          ENTER
        </button>
      </form>

      {/* Footer */}
      <p className="mt-16 text-brown/40 text-xs tracking-[0.15em]">
        A PRIVATE MEMOIR
      </p>
    </div>
  );
};

export default LoginScreen;
