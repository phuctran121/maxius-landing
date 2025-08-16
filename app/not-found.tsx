import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#F4F4F4",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>Error</h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
        Sorry, the page you`re looking for doesn`t exist.
      </p>
      <Link
        href="/"
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#353535",
          color: "white",
          textDecoration: "none",
          borderRadius: "0.375rem",
          fontWeight: 500,
        }}
      >
        Go back home
      </Link>
    </div>
  );
}
