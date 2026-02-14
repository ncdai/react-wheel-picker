export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-screen overflow-x-hidden">
      <div className="mx-auto border-dashed px-4 md:max-w-3xl lg:border-x">
        {children}
      </div>
    </div>
  );
}
