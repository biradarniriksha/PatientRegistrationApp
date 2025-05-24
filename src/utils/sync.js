export const channel = new BroadcastChannel('patient-db-sync')

export const broadcastUpdate = () => {
  channel.postMessage({ type: 'patient-added' })
}