import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#FFF5F7] via-white to-[#FFF0F5] flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-8">
        {/* Animated Logo/Icon */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-24 h-24 rounded-full border-4 border-[#FFD6DE] animate-pulse"></div>

          {/* Spinning ring */}
          <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-[#FF5A7A] border-r-[#FF5A7A] animate-spin"></div>

          {/* Inner pulsing circle */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-[#FF5A7A] to-[#FF8FA3] flex items-center justify-center shadow-lg shadow-[#FF5A7A]/30">
            <svg
              className="w-8 h-8 text-white animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>

          {/* Floating dots */}
          <div
            className="absolute -top-2 -right-2 w-4 h-4 bg-[#FF5A7A] rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#FF8FA3] rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="absolute top-1/2 -right-4 w-2 h-2 bg-[#FFD6DE] rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>

        {/* Loading Text with Gradient */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#FF5A7A] via-[#FF8FA3] to-[#FF5A7A] bg-clip-text text-transparent animate-pulse">
            Loading Product
          </h2>

          {/* Animated dots */}
          <div className="flex items-center justify-center gap-1">
            <span
              className="w-2 h-2 bg-[#FF5A7A] rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></span>
            <span
              className="w-2 h-2 bg-[#FF8FA3] rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></span>
            <span
              className="w-2 h-2 bg-[#FFD6DE] rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></span>
          </div>

          <p className="text-sm text-gray-400 font-medium tracking-wide">
            Please wait a moment...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1.5 bg-[#FFE4EA] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#FF5A7A] to-[#FF8FA3] rounded-full animate-shimmer-bar"></div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-[#FF5A7A]/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-40 h-40 bg-[#FF8FA3]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "500ms" }}
      ></div>
      <div
        className="absolute top-1/3 right-1/4 w-24 h-24 bg-[#FFD6DE]/20 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "1000ms" }}
      ></div>

      {/* Add shimmer animation style */}
      <style jsx>{`
        @keyframes shimmer-bar {
          0% {
            width: 0%;
            margin-left: 0;
          }
          50% {
            width: 70%;
            margin-left: 15%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
        .animate-shimmer-bar {
          animation: shimmer-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;
