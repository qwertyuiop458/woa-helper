import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;
import java.util.Random;

public class ZombieInfection extends JPanel implements ActionListener, KeyListener {
    private static final int WIDTH = 800;
    private static final int HEIGHT = 600;
    private static final int DELAY = 16; // ~60 FPS
    
    private Player player;
    private ArrayList<Zombie> zombies;
    private ArrayList<Bullet> bullets;
    private ArrayList<PowerUp> powerUps;
    private Timer timer;
    private Random random;
    private int score;
    private int wave;
    private boolean gameOver;
    private boolean gameWon;
    
    public ZombieInfection() {
        setPreferredSize(new Dimension(WIDTH, HEIGHT));
        setBackground(Color.BLACK);
        setFocusable(true);
        addKeyListener(this);
        
        initGame();
    }
    
    private void initGame() {
        player = new Player(WIDTH / 2, HEIGHT / 2);
        zombies = new ArrayList<>();
        bullets = new ArrayList<>();
        powerUps = new ArrayList<>();
        random = new Random();
        score = 0;
        wave = 1;
        gameOver = false;
        gameWon = false;
        
        spawnZombies();
        
        timer = new Timer(DELAY, this);
        timer.start();
    }
    
    private void spawnZombies() {
        int zombieCount = wave * 3;
        for (int i = 0; i < zombieCount; i++) {
            int x, y;
            do {
                x = random.nextInt(WIDTH);
                y = random.nextInt(HEIGHT);
            } while (Math.hypot(x - player.x, y - player.y) < 100);
            
            zombies.add(new Zombie(x, y));
        }
    }
    
    @Override
    public void actionPerformed(ActionEvent e) {
        if (!gameOver && !gameWon) {
            update();
        }
        repaint();
    }
    
    private void update() {
        // Update player
        player.update();
        
        // Update bullets
        for (int i = bullets.size() - 1; i >= 0; i--) {
            Bullet bullet = bullets.get(i);
            bullet.update();
            
            // Remove bullets that are off screen
            if (bullet.x < 0 || bullet.x > WIDTH || bullet.y < 0 || bullet.y > HEIGHT) {
                bullets.remove(i);
                continue;
            }
            
            // Check bullet-zombie collisions
            for (int j = zombies.size() - 1; j >= 0; j--) {
                Zombie zombie = zombies.get(j);
                if (bullet.intersects(zombie)) {
                    zombies.remove(j);
                    bullets.remove(i);
                    score += 10;
                    break;
                }
            }
        }
        
        // Update zombies
        for (Zombie zombie : zombies) {
            zombie.update(player.x, player.y);
            
            // Check zombie-player collision
            if (zombie.intersects(player)) {
                player.takeDamage();
                if (player.health <= 0) {
                    gameOver = true;
                }
            }
        }
        
        // Update power-ups
        for (int i = powerUps.size() - 1; i >= 0; i--) {
            PowerUp powerUp = powerUps.get(i);
            powerUp.update();
            
            if (powerUp.intersects(player)) {
                powerUp.apply(player);
                powerUps.remove(i);
            }
        }
        
        // Spawn power-ups randomly
        if (random.nextInt(1000) < 5) {
            powerUps.add(new PowerUp(random.nextInt(WIDTH), random.nextInt(HEIGHT)));
        }
        
        // Check if wave is complete
        if (zombies.isEmpty()) {
            wave++;
            if (wave > 10) {
                gameWon = true;
            } else {
                spawnZombies();
            }
        }
    }
    
    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        Graphics2D g2d = (Graphics2D) g;
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        
        if (gameOver) {
            drawGameOver(g2d);
        } else if (gameWon) {
            drawGameWon(g2d);
        } else {
            drawGame(g2d);
        }
    }
    
    private void drawGame(Graphics2D g) {
        // Draw player
        player.draw(g);
        
        // Draw zombies
        for (Zombie zombie : zombies) {
            zombie.draw(g);
        }
        
        // Draw bullets
        for (Bullet bullet : bullets) {
            bullet.draw(g);
        }
        
        // Draw power-ups
        for (PowerUp powerUp : powerUps) {
            powerUp.draw(g);
        }
        
        // Draw UI
        drawUI(g);
    }
    
    private void drawUI(Graphics2D g) {
        g.setColor(Color.WHITE);
        g.setFont(new Font("Arial", Font.BOLD, 20));
        g.drawString("Score: " + score, 10, 30);
        g.drawString("Wave: " + wave, 10, 60);
        g.drawString("Health: " + player.health, 10, 90);
        g.drawString("Ammo: " + player.ammo, 10, 120);
    }
    
    private void drawGameOver(Graphics2D g) {
        g.setColor(Color.RED);
        g.setFont(new Font("Arial", Font.BOLD, 48));
        String gameOverText = "GAME OVER";
        FontMetrics fm = g.getFontMetrics();
        int x = (WIDTH - fm.stringWidth(gameOverText)) / 2;
        int y = HEIGHT / 2;
        g.drawString(gameOverText, x, y);
        
        g.setColor(Color.WHITE);
        g.setFont(new Font("Arial", Font.BOLD, 24));
        String scoreText = "Final Score: " + score;
        fm = g.getFontMetrics();
        x = (WIDTH - fm.stringWidth(scoreText)) / 2;
        g.drawString(scoreText, x, y + 50);
        
        String restartText = "Press R to restart";
        fm = g.getFontMetrics();
        x = (WIDTH - fm.stringWidth(restartText)) / 2;
        g.drawString(restartText, x, y + 100);
    }
    
    private void drawGameWon(Graphics2D g) {
        g.setColor(Color.GREEN);
        g.setFont(new Font("Arial", Font.BOLD, 48));
        String winText = "YOU WIN!";
        FontMetrics fm = g.getFontMetrics();
        int x = (WIDTH - fm.stringWidth(winText)) / 2;
        int y = HEIGHT / 2;
        g.drawString(winText, x, y);
        
        g.setColor(Color.WHITE);
        g.setFont(new Font("Arial", Font.BOLD, 24));
        String scoreText = "Final Score: " + score;
        String restartText = "Press R to restart";
        fm = g.getFontMetrics();
        x = (WIDTH - fm.stringWidth(scoreText)) / 2;
        g.drawString(scoreText, x, y + 50);
        
        fm = g.getFontMetrics();
        x = (WIDTH - fm.stringWidth(restartText)) / 2;
        g.drawString(restartText, x, y + 100);
    }
    
    @Override
    public void keyPressed(KeyEvent e) {
        int key = e.getKeyCode();
        
        if (key == KeyEvent.VK_R && (gameOver || gameWon)) {
            initGame();
            return;
        }
        
        if (gameOver || gameWon) return;
        
        switch (key) {
            case KeyEvent.VK_W:
            case KeyEvent.VK_UP:
                player.setMovingUp(true);
                break;
            case KeyEvent.VK_S:
            case KeyEvent.VK_DOWN:
                player.setMovingDown(true);
                break;
            case KeyEvent.VK_A:
            case KeyEvent.VK_LEFT:
                player.setMovingLeft(true);
                break;
            case KeyEvent.VK_D:
            case KeyEvent.VK_RIGHT:
                player.setMovingRight(true);
                break;
            case KeyEvent.VK_SPACE:
                if (player.ammo > 0) {
                    bullets.add(player.shoot());
                    player.ammo--;
                }
                break;
        }
    }
    
    @Override
    public void keyReleased(KeyEvent e) {
        int key = e.getKeyCode();
        
        switch (key) {
            case KeyEvent.VK_W:
            case KeyEvent.VK_UP:
                player.setMovingUp(false);
                break;
            case KeyEvent.VK_S:
            case KeyEvent.VK_DOWN:
                player.setMovingDown(false);
                break;
            case KeyEvent.VK_A:
            case KeyEvent.VK_LEFT:
                player.setMovingLeft(false);
                break;
            case KeyEvent.VK_D:
            case KeyEvent.VK_RIGHT:
                player.setMovingRight(false);
                break;
        }
    }
    
    @Override
    public void keyTyped(KeyEvent e) {}
    
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("Zombie Infection");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.setResizable(false);
            frame.add(new ZombieInfection());
            frame.pack();
            frame.setLocationRelativeTo(null);
            frame.setVisible(true);
        });
    }
}
