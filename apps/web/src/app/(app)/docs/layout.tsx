export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto px-4 md:max-w-3xl">{children}</div>;
}
