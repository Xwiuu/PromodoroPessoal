"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <header className="w-full mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-3xl font-bold italic">FOCO & AGENDA</h1>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl cursor-pointer text-neutral-400 hover:text-white transition-colors"
          >
            {" "}
            ⚙️{" "}
          </button>

          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute top-full right-0 mt-2 w-52 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-10"
            >
              <div className="p-2">
                {status === "authenticated" ? (
                  // --- BOTÃO DE SAIR (MODIFICADO) ---
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 text-left px-3 py-1.5 text-sm text-red-400 hover:bg-neutral-700 rounded-md transition-colors"
                  >
                    {/* Ícone de Porta (Logout) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                      />
                    </svg>
                    <span>Sair</span>
                  </button>
                ) : (
                  // --- BOTÃO DE LOGIN (MODIFICADO) ---
                  <button
                    onClick={() => {
                      signIn("google");
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 text-left px-3 py-1.5 text-sm text-white hover:bg-neutral-700 rounded-md transition-colors"
                  >
                    {/* Ícone do Google (SVG) */}
                    <svg
                      className="size-4"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      ></path>
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      ></path>
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.712,35.619,44,29.891,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                    </svg>
                    <span>Entrar com Google</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-auto h-px bg-white -mx-8" />
    </header>
  );
};

export default Header;
