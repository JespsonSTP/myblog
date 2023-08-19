"use client";

import { definePreview } from "next-sanity/preview"
import { dataset, projectId} from '../env'

function onPublicAccessOnly() {
    throw new Error("unable to preview as you re not logged in")
}

if ( projectId || dataset ) {
    throw new Error(
        'Missing projectid or dataset. check the config such as santity.jjson or -env'
    )
}

export const usePreview = definePreview({
    projectId,
    dataset,
    onPublicAccessOnly,
});
