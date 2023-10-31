import React, { FC } from 'react'
import { Check } from 'react-feather'
import { Button } from '@/shared/ui/buttons'
import { Trans } from 'react-i18next'
import { SUCCESS } from '@/shared/lib/consts/styles'
import { PATH_AUTH } from '@/shared/config'
import { useRouter } from 'next/router'

interface SuccessActionProps {
  path: string
  title: string
  buttonTitle: string
}

const SuccessAction: FC<SuccessActionProps> = ({ path, title, buttonTitle }) => {
  const router = useRouter()

  const navigateToPersonalCabinet = () => router.push({ pathname: path ? path : PATH_AUTH.root })

  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <p className="text-[24px] font-[500] text-black">{title}</p>
      <div className="relative my-[42px] flex h-[120px] w-[120px] items-center justify-center">
        <div className="absolute h-full w-full rounded-[50%] bg-[#4fd26c] opacity-[0.15]" />
        <div className="relative z-[1]">
          <Check size={80} color={SUCCESS[500]} />
        </div>
      </div>

      <Button onClick={navigateToPersonalCabinet}>
        <Trans i18nKey={buttonTitle} />
      </Button>
    </div>
  )
}

export default SuccessAction
