'use client'

import config from '../../../../sanity.config'
import { NextStudioLoading } from 'next-sanity/studio/loading'

export default function loading() {
    return <NextStudioLoading config={config} />;
}