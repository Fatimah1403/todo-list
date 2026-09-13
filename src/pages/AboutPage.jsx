function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">About</h2>
        <p className="text-slate-400 mb-8">
          A full-stack todo application built with React, featuring authentication,
          real-time updates, and optimistic UI patterns.
        </p>

        <section className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
          <ul className="space-y-2">
            {['Add, edit, and delete todos', 'Mark todos as complete', 'Filter by status (All, Active, Completed)', 'Sort and search todos', 'User authentication', 'Optimistic UI updates with rollback'].map(f => (
              <li key={f} className="flex items-center gap-2 text-slate-300 text-sm">
                <span className="text-indigo-400">→</span> {f}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4"> Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {['React 18', 'React Router v7', 'Vite', 'Tailwind CSS', 'useReducer', 'Context API', 'REST API'].map(tech => (
              <span key={tech} className="bg-indigo-600/20 text-indigo-300 text-xs font-medium px-3 py-1 rounded-full border border-indigo-500/30">
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default AboutPage;