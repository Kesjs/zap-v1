declare module 'next/link' {
  import * as React from 'react';
  const Link: React.ComponentType<any>;
  export default Link;
}

declare module 'next/dynamic' {
  import * as React from 'react';
  export default function dynamic<T = any>(loader: () => Promise<any>, options?: any): React.ComponentType<T>;
}

declare module 'next' {
  export type Metadata = any;
}

declare module 'next/image' {
  import * as React from 'react';
  const Image: React.ComponentType<any>;
  export default Image;
}


