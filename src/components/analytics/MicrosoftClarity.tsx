'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

const CLARITY_PROJECT_ID = 'z5hpqh0qsz';

export default function MicrosoftClarity() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Clarity.init(CLARITY_PROJECT_ID);
    }
  }, []);

  return null;
}
