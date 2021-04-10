import React, { memo, useCallback } from 'react'

import Link from 'next/link'

import URI from 'urijs'
import { PaginationProps } from './interfaces'
import { useRouter } from 'next/router'
import { PaginationStyled } from './styles'
export * from './interfaces'

const Pagination: React.FC<PaginationProps> = ({
  page: pageProps,
  limit,
  total,
  ...other
}) => {
  const page = pageProps || 1

  const router = useRouter()

  const getNewLocation = useCallback(
    (page: number) => {
      const asPath = router.asPath

      const uri = new URI(asPath)

      const query = uri.query(true)

      Object.assign(query, {
        page: page > 1 ? page : undefined,
      })

      uri.query(query)

      return uri.resource()
    },
    [router.asPath]
  )

  if (!limit || !total) {
    return null
  }

  const pages = Math.ceil(total / limit)

  if (pages < 2) {
    return null
  }

  const rows = []

  if (page > 1) {
    const href = getNewLocation(page - 1)

    rows.push(
      <li key="page-1-0" className={'control'}>
        <Link href={href}>
          <a className={'link'}>«</a>
        </Link>
      </li>
    )
  }

  let lstr = false
  let rstr = false
  for (let i = 1; i <= pages; i++) {
    if (
      (page > 2 && i < page - 1 && i > 1) ||
      (pages - page > 3 && i > page + 1 && i < pages - 1)
    ) {
      if (!lstr && i > 1 && i < page) {
        rows.push(
          <li key={i} className={'control'}>
            <span>...</span>
          </li>
        )
        lstr = true
      }
      if (!rstr && i > page && i < pages) {
        rows.push(
          <li key={i} className={'control'}>
            <span>...</span>
          </li>
        )
        rstr = true
      }
    } else {
      const href = getNewLocation(i)

      rows.push(
        <li key={i} className={'control'}>
          <Link href={href}>
            <a className={['link', i === page ? 'active' : null].join(' ')}>
              {i}
            </a>
          </Link>
        </li>
      )
    }
  }
  if (page < pages) {
    const href = getNewLocation(page + 1)

    rows.push(
      <li key={'page-' + pages + '-0'} className={'control'}>
        <Link href={href}>
          <a className={'link'}>»</a>
        </Link>
      </li>
    )
  }

  return (
    <PaginationStyled {...other}>
      <ul className={'row'}>{rows}</ul>
    </PaginationStyled>
  )
}

export default memo(Pagination)
