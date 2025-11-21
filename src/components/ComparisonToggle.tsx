// Allow comparing Hashimoto's (autoimmune) vs non-autoimmune hypothyroidism
type Props = {
  mode: 'hashimotos' | 'hypothyroid' | 'hyperthyroid';
  onChange: (mode: string) => void;
};

export const ComparisonToggle: React.FC<Props> = ({ mode, onChange }) => {
  return (
    <div className='comparison-toggle'>
      <h3 className='text-lg font-semibold mb-4'>Condition Type</h3>
      <div className='flex gap-2'>
        <button
          onClick={() => onChange('hashimotos')}
          className={mode === 'hashimotos' ? 'active' : ''}
        >
          Hashimoto's (Autoimmune)
        </button>
        <button
          onClick={() => onChange('hypothyroid')}
          className={mode === 'hypothyroid' ? 'active' : ''}
        >
          Hypothyroidism
        </button>
        <button
          onClick={() => onChange('hyperthyroid')}
          className={mode === 'hyperthyroid' ? 'active' : ''}
        >
          Hyperthyroidism
        </button>
      </div>

      {/* Show different connection patterns based on mode */}
      {mode === 'hashimotos' && (
        <div className='mt-4 p-4 bg-orange-50 rounded'>
          <p className='text-sm'>
            Autoimmune: Antibodies directly attack thyroid and may impact
            pregnancy
          </p>
        </div>
      )}
    </div>
  );
};
