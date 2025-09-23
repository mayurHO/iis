"use client";

import Link from "next/link";
import '@/app/styles/frontend/common/common.css';

export default function Button({ label = "Learn More", href, onClick }) {
  if (href) {
    return (
      <Link href={href}>
        <button className="btn common-btn" onClick={onClick}>
          {label}
          <div>
            <img
              src="/Images/common/button-arrow.svg"
              alt="arrow-small-right"
              className="img-fluid arrow-small-right"
            />
          </div>
        </button>
      </Link>
    );
  }

  return (
    <button className="btn common-btn" onClick={onClick}>
      {label}
      <div>
        <img
          src="/Images/common/button-arrow.svg"
          alt="arrow-small-right"
          className="img-fluid arrow-small-right"
        />
      </div>
    </button>
  );
}
