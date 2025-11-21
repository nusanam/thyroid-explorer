// Expandable panel showing all research sources

export const ResearchCitations: React.FC = () => {
  return (
    <details className='mt-8 p-4 bg-gray-50 rounded'>
      <summary className='cursor-pointer font-semibold'>
        Research Sources
      </summary>
      <ol className='mt-4 space-y-2 text-sm'>
        <li>
          Poppe K, et al. "Thyroid disease and female reproduction." Clinical
          Endocrinology. 2007.
          <a href='...' className='text-blue-600 ml-2'>
            View
          </a>
        </li>
        <li>
          Krassas GE, et al. "Thyroid function and human reproductive health."
          Endocrine Reviews. 2010.
        </li>
        {/* ... more citations */}
      </ol>
    </details>
  );
};
