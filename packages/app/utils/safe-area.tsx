// noop
export const SafeAreaProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>

// noop
export const useSafeAreaInsets = () => ({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
})