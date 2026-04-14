import React from 'react';

export default function Logo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}>
      <rect width="32" height="32" rx="4" fill="currentColor"/>
      <path d="M16 8C13.5 8 11.5 9.5 10.5 11.5L8 16L10.5 20.5C11.5 22.5 13.5 24 16 24C18.5 24 20.5 22.5 21.5 20.5L24 16L21.5 11.5C20.5 9.5 18.5 8 16 8Z" fill="none" stroke="white" strokeWidth="1.5"/>
      <circle cx="16" cy="16" r="2" fill="white"/>
    </svg>
  );
}
