import { StyleSheet } from "react-native";

export const carDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },

  imageContainer: {
    height: 280,
    position: "relative",
    overflow: "hidden",
  },

  scrollView: {
    flex: 1,
  },

  image: {
    width: "100%", // أفضل للـ Responsive
    height: "100%",
    resizeMode: "cover",
  },

  backButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 50,
    zIndex: 20,
  },

  /* نقاط التنقل */
  paginationContainer: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    zIndex: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#555",
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFD700",
  },

  infoContainer: {
    padding: 20,
  },

  carName: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "right",
  },

  row: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  infoBox: {
    backgroundColor: "#1a1a1a",
    flex: 1,
    marginHorizontal: 6,
    padding: 14,
    borderRadius: 12,
    flexDirection: "row-reverse",
    alignItems: "center",
  },

  icon: {
    marginLeft: 12,
  },

  label: {
    color: "#888",
    fontSize: 14,
    marginBottom: 4,
    textAlign: "right",
  },

  value: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "right",
  },

  price: {
    color: "#FFD700",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "right",
  },

  description: {
    color: "#bbb",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
    textAlign: "right",
  },

  bottomBar: {
    position: "absolute",
    bottom: 75, // مسافة فوق التاب بار
    left: 15,
    right: 15,
    zIndex: 15,
  },

  airportBox: {
    backgroundColor: "#1a1a1a",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFD700",
    marginTop: 20,
  },

  airportTitle: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 5,
  },

  airportText: {
    color: "#ccc",
    textAlign: "right",
    marginBottom: 5,
  },

  airportList: {
    color: "#fff",
    textAlign: "right",
    marginBottom: 5,
  },

  airportNote: {
    color: "#FFA500",
    textAlign: "right",
    fontSize: 12,
  },

  rentButton: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },

  rentButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
