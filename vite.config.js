import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Polling: on this Windows setup the default file watcher sometimes
    // misses quick successive edits and serves a stale file.
    watch: { usePolling: true, interval: 250 },
  },
});
