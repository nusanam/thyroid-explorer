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
        <li>
          Selva DM, et al. "Thyroid hormones act indirectly to increase sex
          hormone-binding globulin production by liver via hepatocyte nuclear
          factor-4alpha." Journal of Molecular Endocrinology, 2009.
        </li>
        <li>
          'Coomarasamy A, et al. "A randomized trial of progesterone in women
          with recurrent miscarriages." New England Journal of Medicine, 2015.
        </li>
        <li>
          'Practice Committee ASRM. "Optimizing natural fertility." Fertility and Sterility, 2017.
        </li>
      </ol>
    </details>
  );
};
