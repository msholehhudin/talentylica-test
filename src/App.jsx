import { useState } from 'react'
import './App.css'
import { ASPEK_KEYS, ASPEK_LABELS, SCORE_OPTIONS } from './data'

const initScores = () => 
  Array.from({length: 10}, (_, i) => ({
    id: i + 1,
    scores: [1,1,1,1]
  }))


function App() {
  const [students, setStudents] = useState(initScores)
  const [modal, setModal] = useState(false)
  const [result, setResult] = useState(null)

  const updateScore = (studentId, aspekIdx, val) => {
    console.log("Student Id : ", studentId)
    console.log("Aspek ID : ", aspekIdx)
    console.log("Val : ", val)
    setStudents(prev => 
      prev.map(s => s.id === studentId ? {
        ...s, 
        scores: s.scores.map((sc, i) => (
          i === aspekIdx ? Number(val) : sc
        ))
      } : s)
    )

    console.log("student :",students)
  }

  const handleSimpan = () => {
    const output = {}
    ASPEK_KEYS.forEach((key, ai) => {
      output[key] = {}
      students.forEach((s, si) => {
        output[key][`mahasiswa_${si + 1}`] = s.scores[ai]
      })
    })
    setResult(output)
    setModal(true)
  }

  return (
    <div className='min-h-screen p-6'>
      <div>

        <div className='mb-4'>
          <h1 className='text-2xl font-bold text-slate-200 tracking-light'>Aspek Penilaian Mahasiswa</h1>
          {/* <p>Masukkan nilai untuk setiap aspek penilaian</p> */}
        </div>

        {/* <div className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden'>

              <div className="bg-linear-to-r from-indigo-600 to-indigo-500 px-5 py-3 flex items-center gap-3">
                <span className="text-indigo-200 text-xs font-semibold uppercase tracking-widest">Daftar Mahasiswa</span>
              </div>

        </div> */}

        {/* Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-40" />
              {ASPEK_LABELS.map(label => (
                <th
                  key={label}
                  className="text-center text-sm text-slate-500 font-medium pb-3 px-2"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((s, stdIdx) => (
              <tr key={s.id} className="border-t border-slate-200">
                {/* Student identity */}
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    {/* Avatar icon */}
                    <div className='bg-slate-200 rounded-full p-1'>
                    <svg className="w-7 h-7 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                    </svg>
                    </div>
                    <span className="text-sm font-medium">Mahasiswa {stdIdx + 1}</span>
                  </div>
                </td>

                {/* Score dropdowns */}
                {s.scores.map((sc, aspekIdx) => (
                  <td key={aspekIdx} className="py-3 px-2">
                    <select
                      value={sc}
                      onChange={e => updateScore(s.id, aspekIdx, e.target.value)}
                      className="w-full border border-slate-300 rounded px-2 py-1.5
                                 text-sm text-slate-700 bg-white
                                 focus:outline-none focus:border-slate-500
                                 cursor-pointer"
                    >
                      {SCORE_OPTIONS.map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

            {/* Simpan Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSimpan}
            className="bg-slate-800 hover:bg-slate-700 hover:cursor-pointer text-white text-sm
                       font-medium px-6 py-2 rounded transition-colors"
          >
            Simpan
          </button>
        </div>


      </div>


      {/* Modal */}
      {modal && result && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={e => e.target === e.currentTarget && setModal(false)}
        >
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-700">Output JSON</h2>
              <button
                onClick={() => setModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="overflow-y-auto p-4 flex-1">
              <pre className="bg-slate-900 text-green-400 rounded-lg p-4 text-xs leading-relaxed font-mono whitespace-pre overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
