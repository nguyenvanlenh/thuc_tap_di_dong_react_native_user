import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { colors } from "../theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import { getFeedbackText } from "../utils/Utils";
import { API_GET_PATHS } from "../services/PathApi";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';
const ProductReview = () => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const router = useRoute();
  const [user, setUser] = useState(1)
  const navigation = useNavigation();
  const { id_product } = router.params;
  const userid = useSelector(state => state.user)
  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
  };



  const handleSendComment = () => {
    // Check if the comment is empty
    if (!comment.trim()) {
      alert("Bạn chưa nhập nội dung");
      return;
    }

    const commentData = {
      id_user: userid ? userid.user.id : 1,
      id_product: id_product,
      star: rating,
      content: comment,
    };

    fetch(API_GET_PATHS.danh_gia_san_pham, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        navigation.goBack();
        // Xử lý khi nhận được phản hồi thành công từ server
      })
      .catch(error => {
        console.error('Error:', error);
        // Xử lý khi gặp lỗi trong quá trình gửi request
      });

    // Clear the comment input after sending
    setComment('');
  };


  return (
    <View style={styles.container}>
      {/* Star Rating */}
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handleStarPress(i)}
            style={styles.starIcon}
          >
            <Ionicons
              name={i <= rating ? "star" : "star-outline"}
              size={30}
              color={i <= rating ? "gold" : "gray"}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Feedback Text */}
      <Text style={styles.feedbackText}>{getFeedbackText(rating)}</Text>

      {/* Comment Input */}
      <TextInput
        style={styles.commentInput}
        multiline
        placeholder="Hãy chia sẻ nhận xét cho sản phẩm này bạn nhé!"
        value={comment}
        onChangeText={(text) => setComment(text)}
      />

      {/* Send Button */}
      <TouchableOpacity style={styles.sendButton} onPress={handleSendComment}>
        <Text style={styles.sendButtonText}>Gửi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  starIcon: {
    marginHorizontal: 5,
  },
  feedbackText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 16,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 2,
    padding: 10,
    marginBottom: 16,
    height: 150,
  },
  sendButton: {
    backgroundColor: colors.blueRoot,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProductReview;
