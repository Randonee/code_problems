$tree_dataset = [
  { path: "1.4", position: 1 }, { path: "1.2.22", position: 0 }, { path: "1.3", position: 2 },
  { path: "1.4.8", position: 1 }, { path: "1.2.22.10", position: 0 }, { path: "1.5", position: 3 },
  { path: "1", position: 0 }, { path: "1.4.9", position: 2 }, { path: "1.2", position: 0 },
  { path: "1.5.11", position: 0 }, { path: "1.2.7", position: 1 }, { path: "1.3.12", position: 0 },
  { path: "1.6", position: 4 }, { path: "1.4.8.13", position: 0 }, { path: "1.2.22.10.14", position: 0 },
  { path: "1.5.11.15", position: 0 }, { path: "1.6.16", position: 0 }, { path: "1.3.12.17", position: 0 },
  { path: "1.6.16.18", position: 0 }, { path: "1.4.9.19", position: 0 }
]

# The above data represents a binary tree structure, nodes are uniquely identified through a path of IDs,
# starting from the root down to the specific node. This path is a string format consisting of IDs separated
# by dots (.), where the leftmost ID represents the root, and each subsequent ID indicates a child node as
# one descends through the tree.

# For example, the path "19.56.45" corresponds to a node with ID 45, which is a child of node 56, itself a
# child of the root node 19.

# Your task is to implement the following in ruby:

# You may use any array or hash methods to help you solve the problem (map, sort, filter, ...).
# All functions must be pure (do not modify the original data)

# 1. self_and_descendants
# Signature: selfAndDescendants(path: string): Array<number>
# Input: path - a string representing the path of IDs from the root to a specific node.
# Output: A list of IDs for the node identified by path and all its descendants, starting with the ID of the
# node specified by path, followed by the IDs of its descendants in no particular order.
# If the path does not lead to a valid node, return an empty list.

# 2. move_node
# Signature: moveNode(currentPath: string, newPath: string): Array<Hash>
# Operation: Moves the node identified by currentPath to the path identified by newPath.
# Inputs:
# currentPath - the current path string that identifies the node to be moved.
# newPath - the path string that identifies the new path of the node.
# position - the new position of the node relative to it's new siblings.
# Output: An array of hashes representing the new tree structure after the move operation.
# array should contain the path and position of the node.

# 3. children
# Signature: children(path: string): Array<Hash>
# Input: path - a string representing the path of IDs from the root to a specific node.
# Output: An array of hashes representing the children of the node identified by path ORDERED BY POSITION.


def self_and_descendants(path)
  $tree_dataset.reduce([]) { |acc, node| acc << node[:path] if node[:path].start_with?(path); acc }
end

def move_node(current_path, new_path, position)
  throw('ID must stay the same') if current_path.split(".").last != new_path.split(".").last

  new_base = new_path.split('.')[0..-2].join('.')
  base_length = new_base.length + current_path.split(".").last.length

  $tree_dataset.each_with_object([]) do |node, acc|
    if node[:path] == current_path
      acc << { path: new_path, position: position }
    elsif node[:path].start_with?(current_path)
      node_path = new_path + node[:path][current_path.length..-1]
      acc << { path: node_path, position: node[:position] }
    elsif node[:path].start_with?(new_base) && node[:path].length == base_length && node[:position] >= position
      acc << { path: node[:path], position: node[:position] + 1 }
    else
      acc << { path: node[:path], position: node[:position] }
    end
    acc
  end
end

def children(path)
  sub_branch_length = path.split(".").length + 1
  $tree_dataset.reduce([]) do |acc, node|
    if node[:path].start_with?(path) && node[:path].split('.').length == sub_branch_length
      index = acc.find_index { |n| n[:position] >= node[:position] }
      acc.insert(index || acc.length, node)
    end
    acc
  end
end

# Testing code
raise 'self_and_descendants failed' unless self_and_descendants('1.2').sort == ["1.2", "1.2.22", "1.2.22.10", "1.2.22.10.14", "1.2.7"]
moved = [{:path=>"1.4", :position=>2}, {:path=>"1.22", :position=>0}, {:path=>"1.3", :position=>3}, {:path=>"1.4.8", :position=>1}, {:path=>"1.22.10", :position=>0}, {:path=>"1.5", :position=>4}, {:path=>"1", :position=>0}, {:path=>"1.4.9", :position=>2}, {:path=>"1.2", :position=>1}, {:path=>"1.5.11", :position=>0}, {:path=>"1.2.7", :position=>1}, {:path=>"1.3.12", :position=>0}, {:path=>"1.6", :position=>5}, {:path=>"1.4.8.13", :position=>0}, {:path=>"1.22.10.14", :position=>0}, {:path=>"1.5.11.15", :position=>0}, {:path=>"1.6.16", :position=>0}, {:path=>"1.3.12.17", :position=>0}, {:path=>"1.6.16.18", :position=>0}, {:path=>"1.4.9.19", :position=>0}]
raise 'move_node failed' unless move_node('1.2.22', '1.22', 0).map(&:to_s).sort == moved.map(&:to_s).sort
raise 'children failed' unless children('1') == [{path:"1.2", position: 0}, {path:"1.4", position: 1}, {path:"1.3", position: 2}, {path:"1.5", position: 3},{path:"1.6", position: 4}]


