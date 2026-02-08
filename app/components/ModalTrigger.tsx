'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

interface ModalTriggerProps {
  onOpenModal: () => void
}

export default function ModalTrigger({ onOpenModal }: ModalTriggerProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (searchParams.get('access') === '1') {
      onOpenModal()
    }
  }, [searchParams, onOpenModal])

  return null
}