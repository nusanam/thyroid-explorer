// import { NetworkVisualization } from './NetworkVisualization';

// export const BeforeAfterComparison: React.FC = () => {
//   return (
//     <div className='grid grid-cols-2 gap-8'>
//       <div>
//         <h3 className='text-lg font-bold mb-4 text-center'>Before Treatment</h3>
//         <NetworkVisualization
//           severity='overt'
//           scenario={scenarios.find((s) => s.id === 'hashimotos-uncontrolled')}
//         />
//         <div className='mt-4 p-4 bg-red-50 rounded'>
//           <p className='text-sm text-red-900'>
//             TSH: 6.8 | Multiple pathways disrupted
//           </p>
//         </div>
//       </div>

//       <div>
//         <h3 className='text-lg font-bold mb-4 text-center'>
//           After 3 Months Treatment
//         </h3>
//         <NetworkVisualization
//           severity='subclinical'
//           scenario={scenarios.find((s) => s.id === 'hashimotos-controlled')}
//         />
//         <div className='mt-4 p-4 bg-green-50 rounded'>
//           <p className='text-sm text-green-900'>
//             TSH: 2.0 | Improved function, antibodies persist
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
