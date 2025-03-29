const _repository = require("../repositories/sub.repository");

class CartService {
  async getByCustomerId(currentUserId) {
    let existingCart = await _repository.cartRepository.getCartByCustomerId(
      currentUserId
    );

    if (!existingCart) {
      throw Object.assign(new Error("Không tìm thấy giỏ hàng của user này"), {
        status: 404,
      });
    }

    let updatedItems = await Promise.all(
      existingCart.items.map(async (item) => {
        let cosmetic = await _repository.comesticRepository.getById(
          item.comestic_id
        );
        return {
          _id: item.id,
          comestic_id: item.comestic_id,
          comestic_image: cosmetic.image,
          price: cosmetic.price,
          quantity: item.quantity,
          comestic_name: cosmetic ? cosmetic.name : "Unknown",
        };
      })
    );

    return {
      _id: existingCart.id,
      customer_id: existingCart.customer_id,
      items: updatedItems,
    };
  }

  async add(currentUserId, cartRequest) {
    let existingCart = await _repository.cartRepository.getCartByCustomerId(
      currentUserId
    );

    if (!existingCart) {
      const newCart = {
        customer_id: currentUserId,
        items: [cartRequest],
      };
      await _repository.cartRepository.add(newCart);
    } else {
      let existingItem = existingCart.items.find((item) =>
        item.comestic_id.equals(cartRequest.comestic_id)
      );

      if (existingItem) {
        existingItem.quantity += cartRequest.quantity;
      } else {
        existingCart.items.push(cartRequest);
      }

      await _repository.cartRepository.update(existingCart.id, existingCart);
    }

    return "Thêm thành công";
  }

  async update(currentUserId, cartRequest) {
    let existingCart = await _repository.cartRepository.getCartByCustomerId(
      currentUserId
    );
    if (!existingCart) {
      throw Object.assign(new Error("Không tìm thấy giỏ hàng của user này"), {
        status: 404,
      });
    }

    let updatedItem = existingCart.items.find((item) =>
      item.comestic_id.equals(cartRequest.comestic_id)
    );

    if (updatedItem) {
      updatedItem.quantity += cartRequest.quantity;
      if (updatedItem.quantity == 0) {
        existingCart.items.splice(updatedItem, 1);
      }
    }

    await _repository.cartRepository.update(existingCart._id, existingCart);

    return "Đã cập nhật thành công";
  }

  async delete(currentUserId, cartToDelete) {
    let existingCart = await _repository.cartRepository.getCartByCustomerId(
      currentUserId
    );
    if (!existingCart) {
      throw Object.assign(new Error("Không tìm thấy giỏ hàng của user này"), {
        status: 404,
      });
    }

    let deletedItem = existingCart.items.find((item) =>
      item.comestic_id.equals(cartToDelete)
    );

    if (!deletedItem)
      throw Object.assign(
        new Error("Không tìm thấy sản phẩm này trong giỏ hàngg"),
        { status: 404 }
      );
    existingCart.items.splice(deletedItem, 1);
    await _repository.cartRepository.update(existingCart._id, existingCart);
    return "Xóa sản phẩm khỏi giỏ hàng thành công";
  }
}

module.exports = new CartService();
