// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  // res.status(200).json({ name: 'John Doe' })
  res.status(200).json({
    handle: 'test-handle',
    chicago: {
      name: 'Chicago',
      subtitle: 'All Time Faves',
      amount: '8',
      slug: 'chicago',
      img: '/lists/chi.png',
    },
   })
}
