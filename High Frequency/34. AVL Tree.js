class TreeNode {
	constructor(val) {
		this.val = val
		this.left = null
		this.right = null
		this.height = 1
	}
}

class AVLTree {
	// Recursively insert value in subtree rooted with node and returns new root of subtree
	insert(root, value) {
		// step 1: Perform normal BST insert
		if(root===null) return new TreeNode(value)
		if(value<root.val) root.left = this.insert(root.left, value)
		if(value>=root.val) root.right = this.insert(root.right, value)

		// step 2: Update the height of the ancestor node
		root.height = 1+Math.max(this.getHeight(root.left), this.getHeight(root.right))

		// step 3: Get the balance factor
		const balance = this.getBalance(root)

		// step 4: If the node is unbalanced, try out the 4 cases
		// case 1: Left Left
		if(balance>1 && root.left!==null && value<root.left.val) return this.rightRotate(root)
		
		// case 2: Left Right
		if(balance>1 && root.left!==null && value>root.left.val) {
			root.left = this.leftRotate(root.left)
			return this.rightRotate(root)
		}
		
		// case 3: Right Right
		if(balance<-1 && root.right!==null && value>root.right.val) return this.leftRotate(root)
		
		// case 4: Right Left
		if(balance<-1 && root.right!==null && value<root.right.val) {
			root.right = this.rightRotate(root.right)
			return this.leftRotate(root)
		}
		
		return root
	}

	// Recursively delete a node with given value from subtree with given root.
	// Returns root of the modified subtree
	delete(root, value) {
		// step 1: Perform normal BST insert
		if(root===null) return root
		if(value<root.val) root.left = this.delete(root.left, value)
		if(value>root.val) root.right = this.delete(root.right, value)
		if(value===root.val && root.left===null) {
			let temp = root.right
			root = null
			return temp
		}
		if(value===root.val && root.right===null) {
			let temp = root.left
			root = null
			return temp
		}
		if(value===root.val && root.left!==null && root.right!==null) {
			let temp = this.getMinValueNode(root.right)
			root.val = temp.val
			root.right = this.delete(root.right, temp.val)
		}
		// If the tree has only one node, return it
		if(root===null) return root

		// step 2: Update the height of the ancestor node
		root.height = 1+Math.max(this.getHeight(root.left), this.getHeight(root.right))

		// step 3: Get the balance factor
		const balance = this.getBalance(root)

		// step 4: If the node is unbalanced, try out the 4 cases
		// case 1: Left Left
		if(balance>1 && this.getBalance(root.left)>=0) return this.rightRotate(root)

		// case 2: Left Right

		if(balance>1 && this.getBalance(root.left)<0) {
			root.left = this.leftRotate(root.left)
			return this.rightRotate(root)
		}

		// case 3: Right Right
		if(balance<-1 && this.getBalance(root.right)>=0) return this.leftRotate(root)

		// case 4: Right Left
		if(balance<-1 && this.getBalance(root.right)<0) {
			this.right = this.rightRotate(this.right)
			return this.leftRotate(root)
		}

		return root
	}

	rightRotate(z) {
		let y = z.left
		let T3 = y.right
		// Perform rotation
		y.right = z
		z.left = T3
		// Update heights
		z.height = 1+Math.max(this.getHeight(z.left), this.getHeight(z.right))
		y.height = 1+Math.max(this.getHeight(y.left), this.getHeight(y.right))
		return y
	}

	leftRotate(z) {
		let y = z.right
		let T2 = y.left
		// Perform rotation
		y.left = z
		z.right = T2
		// Update heights
		z.height = 1+Math.max(this.getHeight(z.left), this.getHeight(z.right))
		y.height = 1+Math.max(this.getHeight(y.left), this.getHeight(y.right))
		return y
	}

	getHeight(root) {
		if(root===null) return 0
		return root.height
	}

	getBalance(root) {
		if(root===null) return 0
		return this.getHeight(root.left)-this.getHeight(root.right)
	}

	inOrder(root) {
		if(root===null) return
		this.inOrder(root.left)
		console.log(root.val)
		this.inOrder(root.right)
	}

	getMinValueNode(root) {
		if(root===null || root.left===null) return root
		return this.getMinValueNode(root.left)
	}
}

const tree = new AVLTree()
let root = tree.insert(null, 10)
root = tree.insert(root, 20)
root = tree.insert(root, 30)
root = tree.insert(root, 40)
root = tree.insert(root, 50)
root = tree.insert(root, 25)

tree.inOrder(root) // 30 20 10 25 40 50
console.log(tree.getHeight(root)) // 3
tree.delete(root, 30)
console.log(root.val) // 40