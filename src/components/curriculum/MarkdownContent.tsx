import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className = "" }: Props) {
  return (
    <div className={`prose prose-invert prose-sm max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-amber-400 mb-4 border-b border-amber-400/30 pb-2">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold text-amber-300 mt-6 mb-3">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-medium text-slate-200 mt-4 mb-2">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-slate-300 leading-relaxed mb-3">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1 text-slate-300 mb-3 ml-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1 text-slate-300 mb-3 ml-2">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-slate-300">{children}</li>
          ),
          strong: ({ children }) => (
            <strong className="text-amber-300 font-semibold">{children}</strong>
          ),
          code: ({ children }) => (
            <code className="bg-slate-700 text-green-300 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-amber-400 pl-4 italic text-slate-400 my-3">{children}</blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm border-collapse">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="bg-slate-700 text-amber-300 font-semibold px-3 py-2 text-left border border-slate-600">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-slate-300 border border-slate-700">{children}</td>
          ),
          a: ({ children, href }) => (
            <a href={href} className="text-amber-400 hover:text-amber-300 underline" target="_blank" rel="noopener noreferrer">{children}</a>
          ),
          hr: () => <hr className="border-slate-600 my-4" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
