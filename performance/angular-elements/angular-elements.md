---
title: Angular Elements Load Time
---
Angular elements will include by default the Angular framework. As a
result the bundle size will be somewhere around 60kb. This is one of the
common complaints of Angular-elements. First and foremost, it is
important to realize why it is that Angular Elements is this size.

1. This size is large as a result of Angular being bundled within the
   general custom web elements.
2. With the way that Angular Ivy deals with bundling, this will be
   greatly diminished as time goes on.
3. When deferring script, even though it ends up getting loaded, with a
   proper load strategy, it does not affect performance. In fact, if
   built right, with a proper Angular Elements strategy, it can be just
   as effective as lazy loaded elements.

   ```
   <script defer src="elements.js">
   ```

## Lazy Loading Angular Elements